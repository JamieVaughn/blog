---
publishDate: 2022-02-11T11:25:07.322Z
title: Nullish Checking in Javascript
description: Null checks are a common need in programs and it's clunky to do them in Javascript, unless you use the "valueOf" trick
excerpt: Null checks are a common need in programs and it's clunky to do them in Javascript, unless you use the "valueOf" trick
image: images/space_elevator_leds.jpg
category: Articles
tags:
  - Javascript
  - Web APIs
canonical: https://wjv.io/blog/nullish_checking_js
---

## What are Null Checks and What is Nullish?

As programmers we often need to do some ad-hoc type checking for various reasons in our code. A common case is type checking of arguments passed into functions to make sure the subsequent operations and methods you use are supported by the argument type. One of the most frequent type checking needs is to make sure the parameters are not null, because null does not support any methods and will always throw an error if you try to chain any method off them. We call checking for null values "Null Checking". In a simple case it would look something like this:

```js
function stringify(param) {
  if (param === null) return "nullish";
  return param.toString();
}
```

And we can't just test falsiness like this: `if(!param)` because an empty string, `0` or `false` could be valid values in many use cases. And in Javascript we also must consider the `undefined` value that most other languages don't need to consider. So the implementation gets slightly longer:

```js
function stringify(param) {
  if (param === null || param === undefined) return "nullish";
  return param.toString();
}
```

I am using the term "Nullish Checking" to refer to this notion of checking for both `null` and `undefined`, which is necessary for comprehensive null checking in Javascript. The term borrows from the new nullish coalescing operator (`??`) added to the language in 2020.

So it is not really a big deal to write that code above and one could even create a `isNullish` function to encapsulate it for better reuse:

```js
function isNullish(param) {
  return param === null || param === undefined;
}

function stringify(param) {
  if (isNullish(param)) return "nullish";
  return param.toString();
}
```

That would be totally fine, but I like to see if the language actually supports these kind of things natively as an exercise in trying to explore "idiomatic javascript", which is the notion of using the language features as they are whenever possible, rather than bolting on your own utilities.

## The valueOf trick

As a result of that exploration I stumbled on what I call the `valueOf` nullish check. You can use the native javascript method `valueOf` in a slightly clever and useful way to check if a value is not `null` or `undefined`.

```js
function stringify(param) {
  if (!param?.valueOf) return "nullish";
  return param.toString();
}
```

This leverages the optional chaining operator (which was also release to Javascript in 2020) and the native, inherited Object method called `valueOf`.

It is checking to see if the `param` value has the method `valueOf` on its prototype. All values, except `null` and `undefined`, will inherit the `valueOf` method from the `Object` prototype, so all possible values will return an uninvoked function body when evaluating `param?.valueOf`. Then we use a `!` to coerce it to a boolean and flip the boolean as needed to exit the function early if `param` doesn't inherit `valueOf` and is therefore either `null` or `undefined`.

So our custom `isNullish(param)` utility and our native `!param?.valueOf` are almost equal number of characters. `isNullish` is one character longer, but the name could probably be shortened a bit without sacrificing legibility. But `valueOf` leverages idiomatic Javascript by using a native method.

This trick would actually also work with a couple other inherited methods on the Object prototype, such as `toString`. But for one thing `valueOf` is the shortest option on the Object prototype chain. Secondly, I would also go so far as to say `valueOf` hits a semantically meaningful note. The words "value of" do suggest it is checking for if there is something in that `param` rather than nothing, which is exaclty what a nullish check is intending to do. So it makes some level of semantic sense to use it this way. I think it's a pretty cool trick for the Javascript toolbox!

## The null Object Pitfall

There is one catch though and it's one of those legitimate blemishes on Javascript as a language, in my opinion. It's `Object.create(null)`.

`Object.create(null)` creates a Javascript `Object` that has no methods on its prototype. It's like an Object that came out of some void with no context to it nor any contextual relationship to Javascript's normal prototypal inheritance chain. This is related to the problematic design choice in Javascript that `null` is technically an object.

So if we create an object this way it will not have the inherited method `valueOf` and it will appear to be nullish, even if we've added other methods to that object ourselves so it is an otherwise legitimate data structure.

```js
// a few ways to initialize an Object in javascript:
const nullObj = Object.create(null);
const regularObj = Object.create({});
const literalObj = {};

console.log(nullObj); // {}
console.log(nullObj.valueOf); // undefined

console.log(regularObj.valueOf); // {}
console.log(regularObj.valueOf); // ƒ valueOf() { [native code] }

console.log(literalObj.valueOf); // {}
console.log(literalObj.valueOf); // ƒ valueOf() { [native code] }
```

I believe using `Object.create` this way is an anti-pattern and should never be done. [Douglas Crockford has expressed similar opinions as this](/blog/good_parts_crockford) and recommends never using `Object.create` at all. He recommends just declaring object literals instead. Indeed, you'll never encounter a null Object in Javascript unless your code or code you import invokes the `Object.create(null)` code in that way. However I have encountered a few libraries on npm that initialize objects like this, I suppose to reduce their size, so it is out there even if you never write that line yourself.

So you if you want to start using the `valueOf` trick for nullish checking you'll have to be on guard for libraries in your dependency chain that do this (and you'll have to make sure you don't do it either, of course, but that's easier to ensure). Luckily checking your dependencies for this pitfall isn't too difficult with modern editors by just searching for the string `Object.create(null)` in your dependencies (node_modules) directory.

And to all you library authors out there, please reconsider reaching for the `Object.create(null)` anti-pattern! It's not worth it to save a few bytes!
