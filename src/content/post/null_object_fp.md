---
publishDate: 2020-02-21T08:50:07.322Z
title: The Null Object Pattern in the Functional Style
description: Let's see how to create a Null Object pattern in Javascript
excerpt: Let's see how to create a Null Object pattern in Javascript
image: /images/space_elevator_floating.jpg
category: Articles
tags:
  - Javascript
  - Functional
canonical: https://wjv.io/blog/null_object_fp
---

The Null Object Pattern is a common way in OOP to handle `null` references in a graceful way. If a reference to an object is `null` and a method is invoked on that reference, then this will cause an error. Instead, a Null Object can be implemented with the same interface, but where the methods are no-op methods. Other objects can inherit from this Null Object in such a way, that if a `null` reference is passed then they will use the no-op methods from the Null Object rather than throwing an error.

Why not just use conditional checks using `if` statements to check for null? You certainly can. But in OOP it is prefered to use polymorphism over conditionals where possible. In FP, there isn't really an exact counterpart to polymorphism so replicating it takes some adaptation. But in both paradigms, the avoidance of conditionals and `if` statements is desired and can be achieved because the goal is to reduce branching in the program. The problem with handling `null` is that it necessarily adds branching to your logic, because you now have to handle another case. But the Null Object Pattern, while not completely removing it, can at least encapsulate and hide that branching for us.

## Typical OOP implementation in JS

```js
class Discount {
  calculateDiscount() {
    return 0.15;
  }
}
class NoDiscount {
  calculateDiscount() {
    return null;
  }
}
function getDiscount(orderType) {
  return orderType === "matinée" ? new Discount() : new NoDiscount();
}

[getDiscount("matinée"), null].map((o) => getDiscount(o).calculateDiscount()); // [0.15, null]
```

Using the null object pattern, a special version of the Class is created that has the same method and signature, but it only handles `null` values and mitigates the need for more tedious control flow logic that checks for `null` values in the original class interface.

## Typical Functional implementation in JS

Previously we saw a way to implement the Null Object Pattern in an OOP style. A functional style of handling it would look like this:

```js
function Discounts(type) {
  let types = {
    regular: {
      calc() {
        return 0.15;
      },
    },
    nullDiscount: {
      calc() {
        return null;
      },
    },
  };
  return types[type] || types.nullDiscount;
}
Discounts("regular").calc(); // 0.15
Discounts(null).calc(); // null
```

## ECMAScript 2020: Is this pattern necessary anymore?

In the latest version of ECMAScript there are a couple of operators that more or less obviate the need to implement a custom Null Object handler. They are called Optional Chaining (`?.`) and Nullish Coalescing (`??`).

Optional Chaining can be used when trying to access methods or properties on any object such that accessing an undefined property will not cause an error and instead it can be handled with minimal control flow. It would look like this:

```js
class Discount {
  calc() {
    return 0.15;
  }
  days = "MTWTF";
}
let special = new Discount();
special.calc?.(); // 0.15
special.order(); // Uncaught TypeError 🤬
special.order?.(); // undefined (ok, that's better)
special.order?.() || "No specials"; // 'No specials' (NICE!)
special.day; // undefined anyways so optional chaining is not needed for properties
```

When we call the non-existent `order` method unsafely we get an uncaught type error 🤬. We want to avoidthat at all costs. Optional chaining allows us to call `order` in a safe way which can be handled by error paths in the code relatively easily.

This works the same for JS objects:

```js
let obj = {
  days: 'MWT',
  order: () => ['burger', 'fries']
  points: () => 0
}

obj.day // undefined already (it's a property, not a method)
obj.special() // Uncaught TypeError 🤬
obj.special?.() // undefined
```

And we can combine this with Nullish Coallescing to get a fully operational Null Object Handling that also respects intentional falsey values. It's a one liner that can fit anywhere in our code when referencing potentially non-existent methods:

```js
// using `obj` from previous code block
obj.special?.() ?? "No Special"; // 'No Special'
obj.points?.() || "Could not fetch points"; // 'Could not fetch points'
obj.points?.() ?? "Could not fetch points"; // 0
```

So we can see the Nullish Coalescer allows us to handle null and undefined methods alongside methods that may return falsy values like `0` or `''` or `false`.

So is optional chaining combined with nullish coalescing enough to recreate the Null Object pattern in JS? I think so, but perhaps others may still build something more robust like Maybe Monads or Null Object Handling Classes. But I'll be reaching for hese two new tools, optional chaing and nullish coallescing, in ECMAScript first in my programs before opting to go with the more complex patterns.
