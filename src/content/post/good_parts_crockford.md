---
publishDate: 2019-12-30T14:50:07.322Z
title: The Good and Bad Parts of JS (according to Douglas Crockford)
description: Notes of the good parts of Javascript and the parts to avoid according to Douglas Crockford's books and lectures.
excerpt: Notes of the good parts of Javascript and the parts to avoid according to Douglas Crockford's books and lectures.
image: /images/first_mover.jpg
category: Articles
tags:
  - Javascript
canonical: https://wjv.io/blog/good_parts_crockford
---

Javascript, having famously been created in ten days, has some weird parts. Some of the baggage is from being around for so long and from being a creation of the ECMAScript TC39 committee. Despite all of that, it is still a great language with a lot of power and expressiveness. Douglas Crockford contends the detractors of Javascript mainly get frustrated with the language because they approach it from an Object Oriented angle instead of a Functional angle (it is based on Scheme after all, a 1970's FP language). This is by no means exhaustive, but here are some notes on What Crockford considers good (and bad) about JS:

## The Good Parts

### First Class Functions or Higher Order Functions

Functions in JS can take functions as parameters and return functions as values. Javascript has always had this (that's why I list it separately), as it was an adopted feature from Scheme. This permits powerful Currying, Closure patterns and the Continuation Passing Style.

### Good Parts from ES6+

1. Proper Tail Calls for Recursive Function optimization

```js
// The bad way:
function repeat(func) {
  while (func() !== undefined) {
    repeat(func);
  }
}
// Proper Tail Call way:
function repeat(func) {
  if (func() !== undefined) {
    return repeat(func);
  }
}
```

The second example enjoys a performance boost by using less memory due to the Tail call. Proper Tail Calls (i.e. tail call optimization) is simply when the last line of your function returns the self-invoked function. The optimization is from the stack frame to remove old function stack traces and replace it with the newly invoked trace, so there isn't a memory overflow threat.

2. The Spread and Rest Operator `[...array]`
3. The Module System
4. `let` and `const`
5. Destructuring allows for easy RORO (receive object, return object) design patterns
6. Improved Object looping: `Object.keys.forEach()`
7. WeakMap(): Works how Objects should have worked from the start with auto-garbage collection.
8. Template String Literals (great for templating and breaking up regex)

```js
`Hello ${name}`;
```

9. Arrow Functions (aka Lambdas): Great as callbacks/predicates
10. The suitability towards the Functional programming style

```js
// The JS way to do class-free OOP using Functions:
function constructor(spec) {
  let { member } = spec,
    { other } = other_constructor(spec),
    method = function () {
      /* member, other, method, spec */
    };
  return Object.freeze({
    method,
    other,
  });
}
```

## The Bad Parts

### The Old

1. The `new` keyword (error-prone, prefer the literal syntax)
2. Object.create (prefer literal syntax or Object.assign({}, source) to avoid pass by reference errors)
3. The `this` keyword (error prone due to unintuitive value adoption)
4. label breaks
5. prototypes, prototypal inheritance (error prone due to confusion from Own vs. Inherited properties)
   > Note from the author: I disagree with Crockford on this point, I found prototypal inheritance to be much more intuitive than classical inheritance
6. `null` (There should only be `undefined` or `null`, not both. Since `null` regrettably returns typeof as `object`, it ought to be the one removed)
7. falsiness (Coercion in general due to unexpected values, but falsiness in particular trips up control flow quite often with values like `''` and `0`)
8. `for` loops and `for...in` loops (prefer the `.forEach() syntax)
9. `while` loops (prefer recursive functions with tail calls)

### Bad Parts from ES6+

#### Classes

This is only syntactic sugar over functions anyways and it does not change the prototypal inheritance model to the classical inheritance model, so it threatens to mislead OOP programmers about how properties are truly being inherited.

#### Generators

Crockford does not like these because he claims they are inherently "stateful" and cannot be pure functions (i.e. functions without side effects). Crockford feels that unaccounted for "statefulness" accounts for a large number of bugs/errors and so he prefers using pure functions whenever possible, and so dismisses generators since they are inherently impure.

> Note from the author: I somewhat disagree with Crockford's thoughts on this one: While generators _CAN_ be stateful, they certainly do not have to be. It depends on how you author it. I do agree that generators cannot really be pure functions, but that is ok since they can serve as wrappers to other pure functions, which provide a nice Iterable interface for those pure functions. And having the control of an Iterator by default is a powerful interface for dealing with returned values.

Overall I feel that I am in agreement with Crockford's opinions about which parts of Javascript to lean on and which parts to avoid. In particular, Javascript's origins from the Scheme language mean it is best used in the functional styleso it can take advantage of higher order functions, currying, closures, and recursion. And in general I agree about avoiding OOP patterns. Although, there is no need for fanatical avoidance of OOP, both FP and OOP can be used together to great effect.

I mentioned the two places already where I disgree with Crockford on his thoughts here: Prototypes and Generators. I think both of these language features actually have tremendous strengths. This is largely due to lessons I've absorbed from another great JS teacher, Kyle Simpson. I will have a similar notes-dump post about _his_ thoughts in the future.
