---
publishDate: null // 2023-06-09T12:35:07.322Z
title: Minimum Viable Frontend Developer
description: Minimum Viable Frontend Developer
excerpt: Minimum Viable Frontend Developer
image: /images/waterfall_mill.jpg
category: Articles
tags:
  - JS
  - Functional
canonical: https://wjv.io/blog/minimum_viable_frontend_developer
---

# HTML

- DOCTYPE, head, body & boilerplate
- tree data structure
- validators
- Semantic HTML (landmark tags)
- div & span
- p, lists
- form & inputs
- buttons & links
- img
- attributes

# CSS

- stylesheets, &lt;link href />
- &lt;style />
- selectors: tag, aria & attribute
- classless css
- @layers
- box-model, box-sizing
- validators
- rules: main ones

### style

- font group
- box-model group
- image fit & background group
- compositing rules (transform, opacity)
- color: hsla only

### layout

- block & inline document flow
- css grid
- container queries only

# JS

#### Imperative Statements & Primitive Data types
- `const`
- primitives: `number`, `string`, `boolean`, `undefined`, `null`
  - for strings: template strings & `${}` (money-mustache) only
- operators: `===`, `>=`, `<=`, `+, -, *, /, %`, `&&, ||, ??`

```
if() {
} else if {
} else {
}
```

#### Functional & Object Data types
- `() => {}`
- `[]` & array methods
- `{}` & objects: `?.`, `.keys, .values, .entries`

#### Code Patterns & Async
- Closures
- Factory Function Pattern
- ES Modules (import, export)
- Promises & fetch

# React

- JSX
- basic hooks only (state, effect, ref)
- simple custom hooks (useFetch, useLocalStorage)
- prop drilling
- state management: lifting state up


# Advanced topics to pursue afterwards (or join class)

#### HTML
- Rest of HTML tags
- &lt;video> & &lt;audio>
- history of HTML/browsers
- browser compat
- render pipeline, stacking context
- SVG
- Advanced &lt;img />, <picture> ++

#### CSS
- class, specificity
- keyframes, animations
- stacking context
- flex box
- style attr

#### JS
- Other primitives: BigInt, Symbol
- let vs var
- other function syntax
- Web Workers
- standard for loop
- Other looping
- Other Object methods, .freeze
- Map, Set
- async/await
- Event Loop: task/microtask queue

#### React
- useReducer, Other Hooks
- React Query, Zustand
