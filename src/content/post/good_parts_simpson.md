---
publishDate: 2019-12-31T20:50:07.322Z
title: The Good and Bad Parts of JS (according to Kyle Simpson)
description: Notes of the good parts of Javascript and the parts to avoid according to Kyle Simpson's books and lectures.
excerpt: Notes of the good parts of Javascript and the parts to avoid according to Kyle Simpson's books and lectures.
image: /images/painter_of_reality.jpg
category: Articles
tags:
  - Javascript
canonical: https://wjv.io/blog/good_parts_simpson
---

Last time I summarized the good and bad parts of Javascript according to Douglas Crockford... Now I want to do the same according to Kyle Simpson, another Javascript expert I deeply respect. I gathered these opinions from several of Kyle Simpson's lecture on youtube and Linkedin Learning, especially his lectures on ES6, Coercion and Async Patterns.

## Some Bad Parts

1. The `new` keyword. Simpson advises to _never_ use it, with only two exceptions: (1) `new Regex("a*b", "i")` if you absolutely need dynamic regular expressions (other just use static `/a*b/i` syntax) and (2) `new Date() because that's the only way to get the date.
2. `toString()` method on the Array & Object natives since they return misleading values. Simpson recommends writing your own `toString()` methods in these two cases... i.e. calling the `JSON.stringify() method` as a custom `toString()` method on the Object prototype.

## Some Overated Parts

1. The Arrow function is not widely needed... only for lexical scoping... i.e. binding `this` to outer scope
   > I disagree here but not all that strongly. I still use function declarations often for hoisting myself, but find concise arrow functions to be preferred whenever I reach for a function expression. And for callbacks, arrow functions are preferred. Simpson, himself, later on in the lectures I took this from, calls out several prominent use cases for the Arrow function, so this recommendation of his might be exaggerated.
2. The "Death of Var"... in other words, `let` and `const` do not make `var` obsolete. It is still needed for cross scope accessibility
3. `const` is actually not widely needed... (Protecting objects/properties is needed, but not loose variables so most times what you actually want is `Object.freeze`)

## Some Good Parts

1. Type Coercion: Simpson recommends using explicit coercion whenever possible: `String()`, `Number()`, `Boolean()`. Don't use `toString()` or "clever coercion" like `+`, `!!`
2. `let` is great for its auto-closure in `for` loops and other block scopes (but still doesn't replace var)
3. Tagged Templates or Tag functions with Template strings... has led to many useful tag function libraries

```js
function greet() {
  return arguments;
}
var person = { name: "Jon", age: 28 };
// A tagged template is a function call that uses a template literal from which to get its arguments
greet`I'm ${person.name}. I'm ${person.age} years old.`;
// Arguments: [['I'm ', '. I'm ', ' years old.'], 'Jon', 28]
```

4. Rest ("gather") and Spread operators make JS syntax much more declarative
5. Default parameter values are awesome!! Default value can even be a function for logical defaults:

```js
function foo(id = generateID()) {
  //if foo is called with a user ID,
  //then a new ID is generated and assigned for the new user
}
//OR enforce a psuedo type with manual exceptions
const required = (param) => throw "Missing required " + param;
function foo(id = required("id")) {}
```

Default parameters can also be used in combination with the Rest operator and can be used safely with a function that returns an empty Array or Object as a default object assignment instead of using the conventional default assignment using `||`.

```js
// old way
function printObj(obj) {
  let myObj = obj || {};
  console.log(myObj);
}
// new way with default params
function defaultPrint(obj = {}) {
  console.log(obj);
}
```

6. Generators... they are basically a state machine with lazy evaluation since it pauses between calls.

```js
// Can be coupled with while loops for endless generators:
function* uniqueID() {
  while (true) {
    yield Math.random();
  }
}
var num = () => uniqueID().next().value;
num();
```

> I love this take on generators. As long as we remember these generators are usually not pure functions we can still use them for a surprisingly large number of use cases. Since UI often tends to be best modeled as a finite state machine, generators can often model UI states very well.
