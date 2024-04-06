---
publishDate: 2020-12-21T12:35:07.322Z
title: Javascript's Immutability Toolkit
description: A conversation about methods native to Javascript that conserve immutability of data.
excerpt: A conversation about methods native to Javascript that conserve immutability of data.
image: images/blackhole.jpg
category: Articles
tags:
  - JavaScript
  - Functional
  - Web APIs
canonical: https://wjv.io/blog/immutability
---

We'll survey the various methods available natively in JS that allow us to manipulate data without mutating it in place.

In the functional programming paradigm, avoiding mutation of data or state in your application is an important prinicple that helps us to avoid a certain class of bugs related to side effects and state. Maintaining immutibility during data manipulation can help with:

- State management
- Pure Functions
- Race Conditions
- Developer Experience (DX)

When mutating data in place, there is a strong risk that some other piece of the application is still depending on that data's previous state and may break due to that data mutating. By using immutable methods, you can simply make copies of the application state, applying the changes to that copy, and then pass the new copy to the funciton or method that needs to use it, without worrying about other parts of the application being affected by that change unknowingly.

This immutability principle is preferred in the React community when creating internal component state and also when using Redux for managing global state.

The only real downside is that it uses more memory... but memory isn't in short supply with today's hardware. And the improvement in the DX, by making state management more easily understandable far outweighs that downside, in my opinion.

## Favor Non-Mutating Methods

Here is a list of JS arrays methods and a few other ways to manipulate data in a non-mutating way:

```js
const arr = [1]
arr.slice() // prefer .slice over .splice and for general array copying
arr.flat()
arr.concat() // prefer .concat over .push
arr.map() // prefer .map over .forEach
arr.flatMap()
arr.filter()
arr.reduce()
arr.reduceRight()
arr.some()
arr.every()
arr.find()
arr.findIndex()
arr.findLast() // finds from the end
arr.findLastIndex() // finds from the end
arr.join()
arr.toString()
arr.toSpliced()
arr.with() // a simpler .toSpliced
arr.toReversed()
arr.toSorted()
[...arr, 4, 5]
Object.keys, .values. entries() // to manipulate Object as Array then convert back
Object.assign({}, obj)
Object.freeze()
```

Note the recent immutable methods `toSpliced()`<sup><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSpliced">1</a></sup>,
 `with()`<sup><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/with">2</a></sup>,
 `toReversed()`<sup><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toReversed">3</a></sup>,
 and `toSorted()`<sup><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted">4</a></sup> have similarly named methods that cause mutation (`.reverse`, `.sort`, `.splice` & the top level `with` statement), so be careful not to mix them up.

Check MDN's [Array methods in the side bar on the left](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from#) for an exhaustive list.

Pure functions are a central part of data immutability. Pure functions are the canonical black box that simply inputs something and returns some transformation of that input. Input, Output... no side effects. This also tends to keep the functions simple, which improves DX.
A pure function:

```js
function square(num) {
  return num ** 2;
}
```

Now, obviously for an application to be useful, it has to execute side effects at some point. The idea behind pure functions and immutability is to isolate those effectful parts of the program into as small a space as possible and ensure that the largest amount of the program abides by the immutability principles.

## Avoid Mutating Methods

Let's briefly mention some of the common mutating methods in JS that you would be advised to avoid by default. There are, of course, circumstances in which these methods should be used, but they should not be the first choice, in general. Consider only using these methods in the isolated edges of your application into which you are segregating your side effects. They also may be needed as a last resort when immutability is not feasible.

```js
arr.push();
arr.pop();
arr.shift();
arr.unshift();
arr.splice();
arr.sort(); // to adapt this to immutability, use .slice(0).sort() or [...arr].sort()
arr.reverse();
arr.copyWithin();
arr.forEach();
Object.create(); // Mutating in the sense that it inherits prototype properties which can be overwritten
```

One note about `forEach()`: This is the prefered way in the functional paradigm to implement for loops that execute side effects. But for most cases that need loops, `map()`, `filter()` and `reduce()` are the preferred methods.

## Object.freeze() & const

To protect variables' mutability, JS now has the `const` keyword. a variable declared with `const` will be treated as a constant and it will not be able to be overwritten or re-declared. For imuutability reasons, we will want to prefer using `const` over using `let` or `var`. Of course, there will always be reasons to use `let` in cases that you must be able to re-declare a variable, and that's fine. And there will even be cases to use `var` for hoisting reasons, for example, and that is also fine. But in general, default to using `const` unless you find that you positively need one of the other two.

One limitation of the `const` keyword is that it does not prevent overwritting of values in nested data structures like objects and arrays.

```js
const myNum = 5;
myNum = 6; // Throws TypeError, myNum is protected from mutation
const myNum = 6; // Throws SyntaxError, myNum can't be re-declared/re-initialized

const myObj = {
  num: 5,
};
myObj = [6]; // Throws TypeError, myObj is protected from mutation
myObj.num = 6; // this is permitted, the properties within myObj are not protected
```

The way to protect neseted data in an object is to use `Object.freeze`. And since arrays are also objects, this can be used on arrays as well. Here's an example:

```js
const myObj = {
  num: 5,
  nested: {
    num: 1,
  },
};
Object.freeze(myObj);
myObj.num = 6; // JS will silently ignore this, now the internal properties are also protected
console.log(myObj.num); // 5

const myArr = [1, 2, [3, 4]];
Object.freeze(myArr);
myArr[0] = 9; // JS will silently ignore this, now the internal values are also protected
```

Object.freeze has a serious limitation, though and that is that it only freezes an object shallowly:

```js
myObj.nested.num = 9; // this will mutate that property form 1 to 9
console.log(myObj.num); // 9
myArr[2][0] = 9; // this will mutate that property from 3 to 9
console.log(myArr[2][0]); // 9
```

In other words, it only protects to the first level of nesting. So in order to protect all of an arbitrarily nested object or array, you'll have to use a loop or recursion to reach the inner nested objects and freeze each of those as well. This is referred to as a "deep freeze." And rather than try to write your own algorithm to do it, you can use a small library such as [this one](https://github.com/substack/deep-freeze) which has been tested and used safely for many years. However if you really want to implement a simple deep freeze method yourself, it could look something like this:

```js
const obj = {
      name: "Bob",
      job: {
        title : "Worker"
        employees: {
          "Phil": {
            title: "Secretary"
          }
        }
      }
   };

function deepFreeze(obj){
  if(typeof obj !== 'object') return; // escape condition... no more nesting is detected
  Object.values(obj).forEach(deepFreeze) // recursively apply deepfreeze
  Object.freeze(obj);
}

deepFreeze(obj);

obj.job.title = "CEO" // Will silently fail
obj.job.employees.Phil.title = "programmer" // will silently fail
console.log(obj.job.title) // "Worker"
console.log(obj.job.employees.Phil.title) // "secretary"
```

## The Proposal for Records and Tuples

In TC39 (A committee overseeing feature additions to JS) there is a [proposal](https://github.com/tc39/proposal-record-tuple) to add two deeply immutable data types to the Javascript language: Records and Tuples. A record would essentially be a deeply immutable object and a tuple would essentially be a deeply immutable array.

```js
#{ x: 1, y: 2 }; // Record
#[1, 2, 3, 4]; // Tuple
```

These would be a welcome addition to Javascript in general and to the immutability toolkit in particular. It would remove the need for utility libraries like the deep-freeze library discussed above, and even mostly or entirely remove the need for `Object.freeze`, because now we would have deeply immutable object natively.

## Cautionary Tale

I've run across a particularly hard to diagnose bug related to mutability in an application of mine. I was creating an array for a game board using `Array(10).fill({id: 0})`, with the intention that every space on the game board would have a unique object that I could update with game state. Unfortunately, when the `.fill` method is passed an object, it creates an array where every element is a reference to that same passed object in memory. So as I updated one space in the game state of the board (i.e. one position of that array), every space was mutated with that data, not just the one space I was targeting. It was a very weird bug that was hard to track at first, especially if you don't know about immutability and objects being passed by reference. So if you plan to try to use objects as independent state, you will want to go to the effort of copying the objects immutably and passing the copies around, and not the references. Thankfully with our immutability toolkit, we can now use our trusty `.map()` method to help us here:

```js
Array(10)
  .fill(0)
  .map((item, index) => ({ id: index }));
// this will create unique objects in each position of the array.
```

Using `.from()` is an alternative method to accomplish the same thing, because it accepts a callback function as the second argument to fill the values with. So you can pass a callback that returns an object, and each object will be a unique object in memory.

```js
Array.from({ length: 10 }, (_, index) => ({ id: index }));
// the second argument in the callback will be the index
```
