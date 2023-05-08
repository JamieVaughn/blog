---
publishDate: 2020-07-20T08:50:00.322Z
title: Lookup-Table Syntax Options in Javascript
description: Let's see a few ways to create lookup-tables in Javascript
excerpt: Let's see a few ways to create lookup-tables in Javascript
image: /images/robobot.jpg
category: Articles
tags:
  - Javascript
  - Functional
canonical: https://wjv.io/blog/looup_tables
---

Most event-based programming, whether it is for UI or not, needs a way to map some list of actions or inputs to blocks of logic to execute. Procedural Programming may not need this because the entire program is expected to run synchronously and in order. But when responding to events, code will not execute in a predictable order, which requires a good way to organize the possible blocks of logic that may need to run at these asynchronous times. The Asynchronicity, itself, is handled by other patterns (Promises, Futures, Observables Pub/Sub, etc.), but for organizing the callbacks of these patterns, lets take a look at some lookup-table implementation patterns. These patterns appear commonly in state management libraries like Redux and XState to manage state, dispatchers, and actions which may be triggered or transformed within a user interface.

## A Few Options for Authoring Lookup-Tables in JS

- If statements (conventional or ternary)
- Switch Statements
- Objects/Maps (Lookup-Tables)

First we have the humble `if` statement control flow implementation in both conventional and ternary syntax:

```js
function getSound(str) {
  return test === "cat"
    ? "meow"
    : test === "cow"
    ? "moo"
    : test === "dog"
    ? "woof"
    : test === "bird"
    ? "chirp"
    : test === "frog"
    ? "ribit"
    : "silence";
}
```

Or the same logic but with conventional `if` / `else if` / `else` syntax:

```js
function getSoundConv(str) {
  if (str === "cat") return "meow";
  else if (str === "cow") return "moo";
  else if (str === "dog") return "woof";
  else if (str === "bird") return "chirp";
  else if (str === "frog") return "ribit";
  else return "silence";
}
```

Control flow implementations necessarily introduce [cyclomatic complexity](https://en.wikipedia.org/wiki/Cyclomatic_complexity) meaning there is branching logic within one's code. This is considered somewhat of a code smell in the Functional Paradigm because it imposes a cost on code readability. The next two implementations avoid the control flow pattern and thus reduce cyclomatic complexity. They make it eaiser to map pieces of UI directly to blocks of logic, rather than routing multiple UI element events through one imperative block of logic that the control flow must untangle.

The first of the "non-control flow" options is a lookup-table implemented via a `switch` statement:

```js
function switchSound(str) {
  switch (str) {
    case "cat":
      return "meow";
    case "dog":
      return "woof";
    case "cow":
      return "moo";
    case "bird":
      return "chirp";
    case "frog":
      return "ribit";
    default:
      return "silence";
  }
}
```

And next we have an example of a lookup-table function using a simple object factory:

```js
function factorySound(str) {
  return (
    {
      cat: "meow",
      dog: "woof",
      cow: "moo",
      bird: "chirp",
      frog: "ribit",
    }[str] ?? "silence"
  );
}
```

The above implementation uses a factory function that returns plain JS objects, but would look about the same using a Map() or WeakMap(). An easy extra optimization that can be made with this approach is defining the object externally to the function in order to limit how many of these objects are created in memory. Then the function is simply a getter for that object, essentially.

```js
// same obj as above just defined outside function.
const Animals = {cat: 'meow', ... }
function factorySound(str) {
  return Animals[str] ?? 'silence'
}
```

Going this route suggests that the factorySound function could be abstracted to a general `factoryValue` function and could be used on any object that you define in your application:

```js
function factoryValue(obj, str, default = 'silence') {
  return obj[str] ?? default
}
```

All four of the functions above will provide an easy API for retrieving values by passing in a simple enum.
We can test the functions with something simple to inspect their output and we would get something like this:

```js
console.log(getSound("dog")); // 'woof'
console.log(getSoundConv("cow")); // 'moo'
console.log(switchSound("cat")); // 'meow'
console.log(factorySound("snake")); // 'silence'
```

### Which to favor?

This is subjective as any of the styles work in the expected way. The decision of which to use comes down to two things, I think: (1) Readability and (2) Extensibility.

In my opinion, both of the `if` statement styles are the least readable. The conventional `if` statement style would at least offer you better extensibility over the ternary style since you can more easily use multi-line code for more complex logic. But the extensibility is matched or exceeded by the switch and factory styles, so I think it's safe to lay the `if` statement style aside in favor of one of the next two styles.

Between the `switch` style and the factory style, I think there is a fair argument to be made for both. The object factory style's advantage is that, as an object, it is quite literally a map or a key-value store. So it is the thing we set out to recreate, meaning what we see is what we want it to be and not some adaptation or hack. So in terms of readability, I'd give the edge to the oject factory table syntax.

In terms of extensibility, both the `switch` and facotry styles permit multi-line space for complex execution logic. Both can be adapted to use a more declarative style over an imperative style by returning a function instead of executing procedural logic in place. The switch statement `case` block and the factory table allow convenient non-co-located function definitions to be mapped to the keys or `case` block without being invoked inline. So both permit easily passing function callbacks around our program for lazy execution and taking better advantage of closures. And both equally reduce cyclomatic complexity by mapping an enum directly to a block of logic, which reduces code branching unlike the `if` statements.

Perhaps the key distinction is the `switch` statement has more flexibility than the factory table by not being constrained only to enums as the access API. The `switch` statement can also accomodate comparisons to map to execution blocks, which may suit one's program in particular situations. In most situations enums are prefered for readability and are usually good enough, but having the additional flexibility of comparators may explain why `switch` statements seem more popular in Reducer utilities, like React's `useReducer` and Redux, within the functional community.

### Use Cases

A common use case for this pattern is for mapping blocks of code to execute for each UI element that triggers an event. A pitfall that leads to unnecessary cyclomatic complexity is relying on a single function as a callback when any one of an entire set of buttons is clicked. This callback would typically work out which code to execute within the function by using control flow to check either some background global state or checking some flag parameter that is passed in.

The lookup-table pattern lets us separate out the logic of determining which code block to execute into its own structure (i.e. one of the lookup functions above). Then the return value from that lookup-table funciton would, ultimately, be the code block that needs to be executed as a result of the triggering event. Emerging from this pattern is that the control flow mentioned in the previous paragraph simply falls away if the UI is setup accordingly. The UI element can contain the enum value that will be passed in the event object that bubbles and the lookup-table can retrieve the correct function without any control flow using the event object properties. This is what is meant by "pushing cyclomatic complexity out". The logic branching still technically exists in the program, but we've pushed it all the way into the UI layer (instead of it being in the business logic layer) which simplifies our code. Since the branch now implicitly occurs before the moment of user input, the branch logic never explicitly appears in the code itself.

##### An Example

Let's take a simple contrived example of a drop down menu:

The HTML might be something like this:

```html
<label for="choices">Listen to an animal's call:</label>
<select id="choices" onchange="factorySound(event.target.value)">
  <option value="dog">Dog</option>
  <option value="cat">Cat</option>
  <option value="bird">Bird/option></option>
  <option value="cow">Cow</option>
  <option value="bear">Bear</option>
</select>

<img src="" alt="animal" id="selection" />
```

And the javascript can use one of our lookup-tables from before, which you'll notice we can easily extend with a new `bear` field. We can also keep unused fields without consequence, like `frog`, which might be used in another UI component but won't be used in this one, and it will safely be inert here:

```js
function factorySound(str) {
  return (
    {
      cat: soundAction(str, "meow"),
      dog: soundAction(str, "woof"),
      cow: soundAction(str, "moo"),
      bird: soundAction(str, "chirp"),
      frog: soundAction(str, "ribit"),
      bear: soundAction(str, "roar"),
    }[str] ?? soundAction(str, "silence")
  );
}

function soundAction(str, sound) {
  console.log(sound);
  document
    .querySelector("#selection")
    .setAttribute("src", `https://pictureof${str}.com/200/300`);
}
```

We've also added a new function called `soundAction`, which can be the composable function that holds the actual business logic code block that should be run upon the event being triggered. It can contain any arbitrary logic, and of course different functions can be mapped to different lookup-table fields as needed for customizability. In this example, the busines logic just logs the animal sound and populates an image of the animal from a hypothetical animal picture API.

With this kind of organization (which resembles the formalized Command Pattern), you'll notice there are no if statements and no conventional control flow which means we keep our cyclomatic complexity to a minimum. We've pushed all of the logic branching up into the UI layer (which is as high as it can go) and we allow the event system itself to pass the information needed to run the correct code block.
