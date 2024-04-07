---
# publishDate: null // 2019-12-28T20:47:18.322Z
title: Pixel Perfect Considered Harmful
description: Pixel Perfect Considered Harmful
excerpt: Pixel Perfect Considered Harmful
image: /images/valley_village.jpg
category: Articles
draft: true
tags:
  - CSS
  - Design
canonical: https://wjv.io/blog/pixel_perfect_considered_harmful
---

# "Pixel Perfect" Considered Harmful

The QA response came back. My code got kicked back into the "developing" swimlane... again.
This time the space between the list of cards was greater than the 12px shown in the Figma mock up.

Never mind that the Figma viewport was sized to a tablet and the QA team uses their laptop screens. The devs mostly work on double wide monitors and our customers typically visit on mobile anyways.
The pixel perfect mentality causes product reviewers, stakeholders and QA folks to think that the static design mocks rendered in a single aspect ratio and single viewport dimension are some kind of gospel that must be exactly how the deployed final result must strictly adhere to.
But obviously a single Figma design mock cannot somehow accurately reflect how the app will look for all viewports and aspect ratios or for any device out there. And the design team doesn't have time to provide high fidelity mocks for all media breakpoints. Nor should they! It would be a waste of their time to do so rather than get on with thinking about the next feature, anyways.
So what's the problem with the pixel perfect mentality? It's a matter of prioritizing the wrong dimension of a result. It's an especially pernicious manifestation of Goodhart's Law: "When a measure becomes a target, it ceases to be a good measure". In this case, a pixel perfect measure causes reviewers to hyper focus on the wrong result and that can easily cause a development & design team to waste cycles on the wrong things. They'll put effort into marginal design breakpoint tweaks rather than features users really need.

Here's some CSS that should change in proportion to the viewport: font-size, white-space of any kind, padding, margin gaps, number of columns/rows, widths/heights of containers, icon sizes,

None of the above examples should be absolute pixel or rem dimensions. They should be using auto, min ocntent, max content, vw, calc, clamp or other adaptive, flexible unit lengths.

Just about the only thing I can think of as being an absolute pixel value no matter the viewport is the border thickness. Even line width in an svg graphic should probably change with the viewport size, at least clamped between some min and maximum.


The seduction of pixel perfection shatters when faced with the diverse landscape of devices and screen sizes. A component or layout that looks perfect on a designer's high-resolution monitor and with text content of conveniently short length will almost certainly appear stretched or cramped on a smaller smartphone screen. The assumption that a single set of pixel values can cater to the myriad of viewport sizes and aspect ratios and dynamic content that is going to be served is a recipe for layout collisions.

We have to plan for dynamism and plan for varieties instead because so much within a web page will be dynamic including:
1. The device
2. The viewport
3. The layout
4. The container
5. The content length
6. The content type
7. The user preferences such as reduced motion, dark mode, font size settings etc.

the pixel perfect mindset often overlooks the dynamic nature of textual content, layouts and also the containers that the content gets framed in. It's essential to embrace fluidity through responsive units like viewport widths and dynamic calculations. The thing is by embracing the fluidity and dynamism, there is no guarantee anymore that your margin between some border and the edge of the screen or even the edge of the next content container will be the absolute 8 pixels reflected in the design software.
In design software such as Figma, dimensions are always reported in absolute units, commonly pixels. But that creates an inflexible absolute layout and componet design result. Instead, adopting relative units such as percentages, viewport widths, and calculated values allows for a more adaptable layout that caters to the diversity of user devices.



____

Considering adaptive units and limiting minimum and maximum values for these elements ensures a consistent visual experience across different viewports.

In conclusion, the "pixel perfect" mindset may seem appealing in theory, but in the dynamic world of web design and development, it falls short of delivering a consistent and user-friendly experience. Embracing flexible, adaptive units and understanding the inherent variability of content and devices is key to building websites that stand the test of time and technological evolution.
