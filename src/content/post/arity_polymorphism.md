---
publishDate: 2021-01-22T05:35:07.322Z
title: Variadic Functions in Javascript
description: An example of variadic functions in JS
excerpt: An example of variadic functions in JS
image: /images/apples.jpg
category: Articles
tags:
  - Functional
  - JavaScript
  - TypeScript
canonical: https://wjv.io/blog/arity_polymorphism
---

A Variadic Function describes a function that executes different logic depending on the arity, or the number of parameters passed to it. It is also called called function-overloading sometimes, mostly by detractors of this pattern. But this is a feature in many languages, especially functional paradigm languages. Languages like Elixir, Scheme and even Python support it.

While Javascript does not have this as a first-class capability, I'll demonstrate how to work within Javascript's constraints to create a variadic function.

## Example Use Case

Let's imagine we want to implement a function that logs client-side events for us in a few different ways. We want it to be able to log a simple message or a message with a priority rating or log to our server using a service, depending on how many arguments are provided. One option is to define three different functions to accomplish this and call each one separately as the case may necessitate it. While there isn't anything necessarily wrong with that, it does present a non-consistent API surface with which to work with. What if we want to call just one logging function no matter which scenario, and let the function handle which internal logging logic to execute? And furthermore we want to do it in a way that avoids the cyclomatic complexity of `if`-`else` statements...

We could create such a function by leveraging Javascript's array data structure and map the the number of arguments passed to the function to an array position, which would hold the executable logic appropriate for that arity. The array is accessed by arity (minus one) and invoked and then it is returned. Let's take a look at what such a variadic function (we'll call it `polyLog`) might look like:

```js
// We have some library/service that logs to a server via API call
const serverObj = {
  log: (msg) => Server.log(msg + " ...Logged to Server API."),
};

// here is our variadic function
function polyLog(msg, priority, dest) {
  return [
    () => console.log(msg),
    () => console.log(`[${priority}] ${msg}`),
    () => dest.log(`[${priority}] ${msg}`),
  ][arguments.length - 1]();
}

// you can call it 3 ways for 3 different results
polyLog("msg");
polyLog("msg", 5);
polyLog("msg", 5, serverObj);
```

So you can see we've leveraged a Javascript array and the fact that the number of parameters passed to a function is exposed via the `arguments` keyword within the function body. The appropriate index of the array is accessed with `arguments.length - 1` so the array evaluates to the associated sub-function. The order of the sub-functions in the array must be carefully chosen to correspond with the arguments they need. That part is up the developer to ensure.

Encapsulating all of this logging functionality inside one function not only conveniently reduces the API surface for us, but it just makes more sense since it is all related behavior. It also improves maintainability by keeping the function definitions of all possible logging behavior co-located in one data structure. And during refactors, one fix ought to automatically propogate to all invocations of `polyLog` within the app.

## Some Refactoring

The previous section describes the crux of the idea and accomplishes our goal of a variadic, but let's see if we can clean up or improve that code at all.

The first refactoring opportunity is to use function expressions instead of defining the functions inside the returned array. So lets define our logging functions above our `polyLog` function like so:

```js
const simpleLog = (msg) => console.log(msg);
const priorityLog = (msg, priority) => console.log(`[${priority}] ${msg}`);
const serverLog = (msg, priority, dest) => dest.log(`[${priority}] ${msg}`);
```

You'll notice one other necessary change to the sub-functions: We are passing the parameters through now, since they won't be available from the parent scope anymore.

We can also make a small memory optimization by defining our array of functions externally and referencing it in our variadic `polyLog` function:

```js
// this external array becomes our function-arity map
const arityMap = [simpleLog, priorityLog, serverLog];

// Now polyLog is a wrapping interface for our function-arity map
const polyLog = function (msg, priority, dest) {
  return arityMap[arguments.length - 1](msg, priority, dest);
};
```

So now the array of sub-functions is defined once instead of each time `polyLog` is invoked, which saves on memory. And our function is also mostly just an abstraction layer wrapping our array that serves as our function-arity map.

### Note On Arrow Functions

It's important to note, this technique doesn't really work with arrow functions as they do not contain a reference to `arguments` in their function body. However, there is a hacky workaround by using the spread operator, although this should be avoided as the parameters necessarily will lose all or most of their semantic meaning.

```js
const arityMap = [simpleLog, priorityLog, serverLog];
const polyLog = (...args) => arityMap[args.length - 1](...args);
// Because we spread on args, we don't know what each parameter is called anymore
```

## More Abstraction

Now that `polyLog` has been abstracted in the "Some Refactoring" section, it is starting to look more like a general API surface. But let's try to abstract it further. What if we allow the function-arity array to be passed in as a parameter as well so that we can define one `variadic` function that could allow any array of functions be invoked with indefinite arity?

```js
function variadic(array, ...args) {
  const arity = args.filter((a) => a !== undefined).length;
  return array[arity - 1](...args);
}
```

A trade-off that has to be made here is spreading the `args` out because for this abstract case, we will not know how many parameters the functions will be needing. And so it suffers from not being able to make use of the `arguments` keyword as before. Instead we have to filter the args array to reveal how many parameters were actually passed. So I'm not sure if that level of abstraction would be useful... It may be taking it too far. We also lose some semantic naming to have one function name handle all of our variadic functions. Perhap, though, the benefit can be found in using it more like a factory function that produces other variadic functions each with their own helpful names:

```js
// simpleLog, priorityLog & serverLog are defined as above
const arityMap = [simpleLog, priorityLog, serverLog];
const polyLog = (msg, priority, dest) =>
  variadic(arityMap, msg, priority, dest);
// anotherArityMap is not defined, but you can imagine what it might be
const anotherArityMap = [double, exponentiate, multiply];
const polyMath = (num1, num2, num3) =>
  variadic(anotherArityMap, num1, num2, num3);
```

So this extra abstraction might be useful as a sort of variadic function factory, but your mileage may vary.

## Error Handling

So far we've used `polyLog` under the "Happy Path" scenarios only. So let's think about the "Sad Path" and error handling a bit. Sometimes `polyLog` might be called with no parameters or maybe even with more than three parameters. Let's add some more structure to the function-arity map array so that it can safely handle such situations:

```js
// The sub-functions are back in an internal array in this example
function polyLog(msg, priority, dest) {
  const nargs = arguments.length;
  return [
    () => console.log("Error: polyLog was invoked with no arguments"),
    () => console.log(msg),
    () => console.log(`[${priority}] ${msg}`),
    () => dest.log(`[${priority}] ${msg}`),
    () =>
      console.log(
        "Error: polyLog was invoked with too many arguments: " + nargs
      ),
  ][nargs > 3 ? 4 : nargs]();
}
```

We've changed how we are accessing the array index now to use the value of `arguments.length` without substracting `1` because now we've added a new sub-function that will execute when no parameters are passed. We also save a reference to `arguments.length` in the constant `nargs` (number of args) since we now access that value twice. Finally, we perform a quick comparison on `nargs` to catch the scenario where more than 3 parameters are passed. In such a case we pass a value of 4 so that a default function will be invoked for handling such errors. The sub-functions at positions 0 and 4 can be customized to handle those class of errors in the way best suited for your use case.

If you absolutely want to remove the harded coded numbers `3` & `4`, then there's a change you can make to do so which uses the functions `.length` property, which references the number of parameters that are in the function definition. So we can define a `const len` that takes that value and uses that to compare against the number of parameters that were actually passed in `nargs`.

```js
function polyLog(msg, priority, dest) {
  const nargs = arguments.length;
  const len = polyLog.length;
  return [
    () => console.log("Error: polyLog was invoked with no arguments"),
    () => console.log(msg),
    () => console.log(`[${priority}] ${msg}`),
    () => dest.log(`[${priority}] ${msg}`),
    () =>
      console.log(
        "Error: polyLog was invoked with too many arguments: " + nargs
      ),
  ][nargs > len ? len + 1 : nargs]();
}
```

## Typescript

In Typescript we can extend this to get terse type checking as well:

```ts
interface ServerpolyLog {
    log: (msg: string): void
}

function polyLog (
    msg: String,
    priority: Number | undefined,
    dest: ServerpolyLog | undefined
  ): void {
	return [
        () => console.log(msg),
        () => console.log(`[${priority}] ${msg}`),
        () => dest.log(`[${priority}] ${msg}`),
    ][arguments.length - 1]()
}
```

I'll leave it to the reader to incorporate the error handling parts into the Tyepscript implementation.
