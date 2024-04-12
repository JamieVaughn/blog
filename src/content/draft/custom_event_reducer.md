---
# publishDate: null // 2023-05-09T12:35:07.322Z
title: Ditch Redux & Use CustomEvent for a Native Reducers
description: Ditch Redux & Use CustomEvent for a Native Reducers
excerpt: Ditch Redux & Use CustomEvent for a Native Reducers
image: /blog/waterfall_mill.jpg
category: Articles
draft: true
tags:
  - JS
  - Functional
  - Redux
canonical: https://wjv.io/blog/custom_event_reducer
---


```js
 function create_custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
	return new CustomEvent(type, { detail, bubbles, cancelable });
}

node.addEventListener(type: eventString, listener, options: {capture = false, once = false, passive = false, signal: AbortSignal})
// listener can be null, object with handleEvent method: {handleEvent(): ...}, or a function
```