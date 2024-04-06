---
publishDate: 2019-12-28T20:47:18.322Z
title: Simple State Reducer With Objects, Switch-Case & Generators
description: Let's build a super simple State Reducer in three different ways
excerpt: Let's build a super simple State Reducer in three different ways
image: images/valley_village.jpg
category: Articles
tags:
  - JavaScript
  - Functional
canonical: https://wjv.io/blog/state_reducers
---

Finite State Machines and State management is now an important part of frontend development. Libraries like Redux, XState and Microstates.js are creeping into wide spread use, especially in the React community. Those libraries provide a robust and complex solution to state management and are well suited to production applications. But for learning the concept of State Reducers and Finite State Management let's build a super simple **State Reducer** in three different ways:

- Object Lookup-Table
- Switch-Case statement
- Generator function

A state reducer takes in a state and an action and returns a new state in a deterministic fashion. It's referred to as a reducer because it reduces two inputs into a single state as an output. The deterministic part of this meshes nicely with functional programming, because it can be expressed with pure functions.

## Object Lookup-Table

The lookup-table provides an easy way to map a state value to an enum by way of a key in an object. It can also serve as something like a Class, since various methods can be attached to the object as well (but do not have to be).

```js
const stateReducer = {
  current: "red",
  red: "green",
  yellow: "red",
  green: "yellow",
  next: function () {
    this.current = this[this.current];
  },
  getState: function () {
    console.log(this.current);
  },
};
```

## Switch-Case Statement

The swtch statement is the go-to reducer pattern in the React-Redux world. It's very straight forward and also at least as powerful as the lookup-table. In certain cases, it can be more flexible and powerful than the lookup-table. It is not as concise, though and can't contain related methods within it. When inside a function the new state string can be returned instead of reassigned.

```js
switch (action) {
  case "red":
    state = "green";
    break;
  case "yellow":
    state = "red";
    break;
  case "green":
    state = "yellow";
    break;
  default:
    state = "green";
    break;
}
```

## Generator Function

The generator function can also be used as a reducer, although it rarely is since it is quite new to Javascript. A perpetual `while` loop can be used to make the generator continuously yield state values.

```js
function* stateReducer(state) {
  let states = ["green", "yellow", "red"];
  let nextState = (states.indexOf(state) + 1) % 3;
  while (states.includes(state)) {
    yield states[nextState];
  }
  yield state; // a default state return value
}

stateReducer("green").next(); // {value: "yellow", done: false}
```

## Action Routers

All of these approaches simply map an action type to an execution block (i.e. a function) with a predetermined set of logic. This is similar to a page router, which determines what content to dispay on the page (a.k.a. "state") given a particular URL query string or path. We can think of this pattern as a "Action Router" since it maps particular action objects, enums or strings to a given function, which determines the next application state. In fact, the concept of a page router and a state reducer are not just "similar" they are pretty much the same. A page router controls the whole page and is inextricably linked to the URL string state, while the state reducer controls some object's state in memory, which may impact potentially the whole page or merely a bit of information in the background. There is no necessary specification or ceremony around the state object, like there is around the URL, but state management libraries like Redux do introduce and enforce some level of convention to make things more consistent when interacting with the state object (a.k.a. the `store`).
