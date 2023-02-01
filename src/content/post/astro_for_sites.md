---
publishDate: 2023-01-31T11:43:57.322Z
title: Astro for sites
description: Astro for sites, Solid or Svelte for Apps.
excerpt: Astro for sites, Solid or Svelte for Apps.
image: /assets/images/cover.jpg
category: Articles
# draft: true
tags:
  - HTML
  - Astro
  - Design
canonical: https://wjv.io/blog/astro_for_sites
---

# Astro For Sites

I've converted my old Next.js blog to use Astro, which is now powering this very site you're reading here! And Astro has blown me away with it's developer experience for a site like this. Hainvg top level `await` and the ability to fetch markdown posts so easily is just so nice. It makes using markdown files in a directory "as a database" feel so natural and it's honestly wonderful DX.

## Solid or Svelte for Apps

Channeling @Swyx here: I am now convinced my goto now is: <strong>Astro for sites, and Solid (or Svelte) for Apps.</strong> I'm still taking Solid and Svelte out for some test drives so that's why I'm hedging a little bit here. I've used both for small toy projects, and don't get me wrong they are both phenomenal. But I haven't used their respective meta-frameworks sufficiently yet, to find my personal favorite. But for making content sites, I don't feel any need to look further than Astro. Honestly, using something like Svelte or Solid strikes me as overkill at this point. Perhaps if I need to implement a user login/authentication for this blog would be the only possible reason to change my mind on that (however,  I don't and won't need user login here). As a side note, here I'm also keeping a close eye on Qwik, since that also looks fascinating. However, I haven't tried that framework out at all yet, so I can't say either way there. I'll probably give Qwik a spin fairly soon as well on some small toy app I eventually want to play around with.

## Sites vs Apps?

What's the distinction that I'm making between sitess and apps here? Well, this is very much an opinion, but I think the main distinction is a need to client side global state management. If there is none, then it's a site, if there is some, then it's an app. The key is thinking through the site's needs and features enough to be able to predict whether you'll need that or not.

With Astro I can easily pull in `solid-js` for small demo widgets using MDX within my markdown articles. It was seriously easy, too easy. MDX just worked and I had options with what UI framework I use to pwoer the client side component. I naturally went with SolidJS, which I'm a big fan of for interactive widgets due to it's fidelilty to the DOM as well as its wonderful reactive primitives, of course!

## What Next?

I'll be using Astro for another content blog site for another business shortly. As for SolidJS, I'm spinning up a data visualization component library with SolidJS and storybook, and also working on a cooldown based RTS game with SolidJS as well, which I'm eager to begin. And for my more interactive LMS (learning management system) site I'll be using SvelteKit to give that a serious try. Looking forward to both!