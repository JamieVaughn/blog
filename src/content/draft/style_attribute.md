---
# publishDate: null // 2024-12-29T12:35:07.322Z
title: Is the style attribute good again?
description: With components, jsx and utility css being the norm, can the style attribute make a comeback?
excerpt: With components, jsx and utility css being the norm, can the style attribute make a comeback?
image: /blog-placeholder-5.jpg
category: Articles
draft: true
tags:
  - css
  - jsx
  - js
canonical: https://wjv.io/blog/template
---

# Is the style attribute good again?

The frontend scene has embraced component architecture primarily with jsx templating and many, tho not all, even favor utility or token-based css systems like tailwind which locate css styling in the jsx template.

The component architecture has strong basis for becoming dominant. The css being inserted into the jsx template for component architecture frameworks is not controversial and has won out due to overall convenience as well as due to helping support single file components as a pattern. But most css is still put into css classes, in other words in the jsx className attribute.

But none of those classes are actually used by the developer for anything. It is only a mapping for the css system to appy styles. More over if you inspect the class strings that these systems spit out in the compiled output, they are an illegible mess. Some of them are even an illegible mess in the authoring step (\*cough\* tailwind \*cough\*).

In the past, there were two main reasons to apply css styling via class attributes: (1) the guideline of separation of concerns and (2) specificity conflicts. But separation of concerns is already ditched in the component architecture model and specificity concerns are likewise ditched with single file component patterns that use some kind of css scoping (generally through unique collision-free class naming). But ultimately neither of those two concerns matter anymore in the dominant modern framework paradigms. So if it doesn't actually matter that these are placed in the class atribute anymore, why are we still shunning the style attribute?

https://dev.to/antonzo/approaches-to-style-react-components-best-use-cases-4ifb#inlinestyling

```js
const styleObj = {padding: rem`1`, color: hsl`0,50,100`, } // supports intellisense, typing, tokens, syntax highlighting
const styleStr = style`{padding: 1rem, color: hsl(0,50%,100) }` // avoids javascript object overhead, extensions can support syntax highlighting
<MyComponent style={style} />
// or
<MyComponent style />
```