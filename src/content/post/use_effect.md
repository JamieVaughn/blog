---
publishDate: 2021-02-05T10:35:07.322Z
title: React's useEffect as an "Event Listener"
description: Learning useEffect can be challenging to newcomers to React, but teaching it as an analog to addEventListener can make it easier
excerpt: Learning useEffect can be challenging to newcomers to React, but teaching it as an analog to addEventListener can make it easier
image: images/halfling_ranger.jpg
category: Articles
tags:
  - JavaScript
  - React
canonical: https://wjv.io/blog/use_effect
---

React Hooks are amazing. I find they make it incredibly easy to modularize any piece of logic and then use it seemlessly anywhere in your app. We now get statefulness or statelessness within a consistent function component API by recasting lifecycle hooks as a set of distinct, composable event subscription methods or "Hooks". This lets us cleanly group state/action/effect by feature or component, effectively providing us with extensible functionality lacking in `Class` components. Yes, there were HOCs for `Class` components but those were kludgy for sharing non-presentational logic, with Hooks the non-presentational logic can be easily composed and shared in a function's closure.

One Hook in particular, `useEffect()` is extremely powerful, but it is also confusing especially to those learning a Javascript framework for the first time. I also sometimes hear of veteran React users lamenting the demise of React's life cycle methods and deriding `useEffect()` as a step backwards in some way from those.

But I strongly disagree. The more that I use `useEffect()`, the more I think the whole concept of life cycle methods were a kludge that was leading us astray all along. On some days, I might even go so far as to say they are an anti-pattern.

That might sound harsh, but let me explain.

The life cycle methods (componentWillMount, componentWillUpdate, componentWillUnmount, etc.) trigger when a component life cycle reaches a certain point or time in the render cycle. This is really just a disguised equivalent to having hard-coded checkpoints in your code to give you an opportunity to make assertions or control flow statements and run some other logic depending on a condition. This is essentially a slightly more sophisticated form of Polling.

But if we think about this, we ought never to really need to run code after some inflexible elapsed interval of time (i.e. a life-cycle point). That is what Polling does. On the contrary, what we NEED is to run code when a value changes. If we can set up some observer that notifies us of that change, then we can run that logic only when it is absolutely needed. This is what useEffect now grants us.

Polling is discouraged these days for good reason, but it was at one time a common pattern in apps, before the days of callbacks. Callbacks were an improvement asynchronous processing that liberated developers from the terrible anti-pattern of Polling with `setTimeout()` or `setInterval()`. But callbacks quickly led to callback hell which is why it is also a kludge that has been supplanted by other, better asynchronous patterns like Promises and Async/Await.

Similarly to callbacks, life cycle methods are a kludge to avoid the hell of having no way to listen to your app's internal state-change events for the purpose of notifying some other part of the app to execute some side effect. But, with `useEffect()` we now get an asynchronous pattern to help us manage that in a way that is on par with the introduction of Promises to better compose callbacks.

With `useEffect()`, we essentially have an off-the-shelf `addEventListener()` where the event being listened to can be a change in any piece of app state that we want (i.e. whatever we put in the dependency array).

So Promises let us sequentially tie an initiation of a callback to a trigger, independently of time. And `useEffect()` let's sequentially tie a callback to a change in a value of interest. You can think of this trigger as an "app state event", which is no different conceptually to the browser events were familiar with like `"click"`, `"mouseover"`, `"scroll"`, etc. But now instead of a set number of listenable events provided to us from the browser, we can now listen to a change on any and every variable in our app.

Consider if the authors of React had made the call signature of `useEffect()` more like `addEventListener()`:

```js
useEffectListener([foo], () => {
  // do side effects
});

addEventListener("click", (e) => {
  // do side effects
});
```

Above our `useEffect()` Hook is rewritten slightly to look more like the familiar `addEventListener()` and its immediately clear the event being listened to is a change in `foo` after which it will run the function passed as the second parameter... just like with `addEventListener()`. Furthermore, since `foo` is in an array, the Hook's api probably affords us the opportunity to listen to multiple values simultaneously. Convenient! I think this Hook would be understood much more intuitively by developers coming from vanilla Javascript if it is thought of in this way.
