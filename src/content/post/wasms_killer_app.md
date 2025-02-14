---
publishDate: 2025-02-13T08:30:00.322Z
title: WASM's Killer App
description: WASM's Killer App
excerpt: WASM's Killer App
image: /images/prism_space.webp
category: Articles
draft: true
tags:
  - JS
  - WASM
canonical: https://wjv.io/blog/wasms_killer_app
---


# WASM's Killer App?

WASM has been getting a lot of attention for being a close to the metal language that could potentially displace javascript in the browser. There's certainly clear potential for it to unlock the great performance boosts for web applications, at least in some situations. Some believe it could also unlock some degrees of freedom for javascript-averse developers to use other languages to write web browser UI's in any server-side language they choose and then use WASM as the compile target. While I really like javascript (or typescript, actually), many people would revel in the opportunity to never have to write it!

And that may possible thanks to WASM to some degree. Although, there are serious hurdles to it, such as WASM's limited capacity to interop with the browser DOM, at least as of now. However, I think WASM might counter-intuitively make javascript/typescript more popular not less, in one of those not-so-surprising "always bet on the web" situations. 

There's two major uses for WASM with javascript that I look forward to. One is WASM as a universal development build target for universal deployments. In some ways, one can think of this as the next iteration of what Docker has done for web development. Being able to build for WASM to hopefully deploy anywhere is exactly the promise that non-javascript language users are also delighted about, but this ability will equally empower javascript developers as well and significantly streamline various build & deploy toolchains for everyone. But the other is where the real potential lies and it has nothign to do with builds or deployment really. It has to do with empowering javascript to compete in the burgeoning A.I. race with top-caliber performance.

That's because I think WASMs first really killer app that will make it take off in usage will be bringing high performance Machine Learning & A.I. into the nodejs ecosystem and posssibly even into the browser potentially. Imagine being able to run an LLM directly in your browser using WASM and message passing it's output to javascript for a user? That's a really enticing application space. Training LLM's in the browser may still be unfeasible, but perhaps training them with WASM and a nodejs interop on a local machine would be viable and make such endeavors much more accessible to a wider group of developers. 

So instead of WASM's original intended purpose as a compile target for other languages, we may witness it being yet another huge feature improvement to javascript/node so those developers are able to do even more programming within their already familiar language and ecosystem. So rather than bringing other languages into the web via a WASM compile target, we could well see compute-heavy applications like LLMs and A.I. come to javascript instead. In either case, javascript will remain the interop or glue code language for such ML models.
