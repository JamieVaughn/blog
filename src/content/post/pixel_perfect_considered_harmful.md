---
publishDate: 2024-04-08T18:55:18.322Z
title: '"Pixel Perfect" Considered Harmful'
description: Embracing fluid over rigid designs yields websites that bend but don't break under the strain of user, content & device diversity.
excerpt: Embracing fluid over rigid designs yields websites that bend but don't break under the strain of user, content & device diversity.
image: /images/not_pixel_perfect.webp
category: Articles
tags:
  - CSS
  - Design
canonical: https://wjv.io/blog/pixel_perfect_considered_harmful
---

# "Pixel Perfect" Considered Harmful

Have you been here? I sure have and it's very 🤦:

> The QA response came back. My code got kicked back into the 'developing' swimlane… again. This time the space between the list of cards was greater than the 12px shown in the Figma mock up.

Never mind that the Figma viewport was sized to a tablet and the QA team uses double wide monitors. The devs have laptops and our customers typically visit on mobile anyways.
The problem with the pixel perfect mentality is that it causes people to think that static design mocks rendered in a single aspect ratio and single viewport dimension can somehow accurately reflect how the app will look for all viewports and aspect ratios for any device out there. And that they MUST look the same on every viewport. Indeed, ensuring a consistent visual experience across different viewports & devices is a different proposition from ensuring the same absolute box model & layout dimensions across different viewports & devices.

However, even the minimum dose of pragmatism yields to that sort of rigid thinking and should allow for a relaxed constraint on the exact manner in which a design stretches and bends to fit into different viewports. We always should want to <strong>favor fluid designs over rigid thinking</strong>, because the web is fluid due to its diversity and the diversity of the users & devices that browse it.

Some css styling, of course, ought to and easily can be the same no matter the viewport, such as `color`, `font-family` & icon choices, `border`, `list-style` and `text-decoration` and several others. In short, styles which are independent of space. But the rigidity around pixel perfection needs to be relaxed for css styles that do change spacing.

Here's some CSS that should change in proportion to the device viewport: Box model properties like `margin`, `padding` (exception here for common border widths), `font-size` & icon sizes, layout `gap`, the number of columns/rows, `width`/`height` of containers. In short any css styles that effect spacing and layout.

Ideally, none of the above example style rules should even be defined absolute pixel dimensions. They should be using fluid units like `auto`, `min-content`, `max-content`, `vw`, `fr`, `calc`, `clamp` or other adaptive, flexible, unit lengths.

Just about the only thing I can think of as being an absolute pixel value no matter the viewport is the border thickness, since those don't vary signficantly anyways, typically they're between 1 and 4 pixels roughly. Even line width in an svg graphic should probably change with the viewport size, at least clamped between some min and maximum.

These represent two of a developers best arrows in the quiver:

1. adaptive fluid units (`max-content`, `vw`, `fr`, `rem`, etc)
2. constraining minimum & maximum values for those fluid units (`calc`, `clamp`, `min`, `max`, `minmax`)

The seduction of pixel perfection shatters when faced with the diverse landscape of devices and screen sizes. A component or layout that looks perfect on a designer's high-resolution monitor and with text content of conveniently short length will almost certainly appear stretched or cramped on a smaller smartphone screen. The assumption that a single set of pixel values can cater to the myriad of viewport sizes and aspect ratios and dynamic content that is going to be served is a recipe for layout dysfunctions.

We have to account for dynamism by planning for diversity instead because so much within a web page will vary depending on different factors of the user that are out of the developers & designers control, such as:

 1. The device
 1. The viewport
 1. The browser
 1. The active browser extensions
 1. The layout (portrait/landscape)
 1. The container
 1. The content length
 1. The content type
 1. The user's preferences such as reduced motion, dark mode, font size settings etc.

The pixel perfect mindset often overlooks the dynamic nature of textual content, layouts and also the containers that the content gets framed in. It's essential to embrace fluidity through responsive units like viewport widths and dynamic calculations. The thing is by embracing the fluidity and dynamism, there is no guarantee anymore that your margin between some border and the edge of the screen or even the edge of the next content container will be the absolute 12 pixels reflected in the static design software mock.

In design software such as figma, dimensions are always reported in absolute units, commonly pixels. But that encourages a rigid manner of thinking and QA'ing which compels the developer to reach for an inflexible, absolute layout and component design system that won't adapt to the variation of digital consumption on the users' end. Instead, designers should adopt relative units such as percentages, viewport widths, and calculated values allows in cases of css styles that effect spacing. And QA process should account for the reality that spacing will be relative, not absolute. This will yeild a more adaptable layout for the UI that caters to the diversity of user devices, and ultimately a better UX overall.

The "pixel perfect" mindset may seem appealing in theory, as it is a "simple" in a way. But in the dynamic world of web design and development, it falls short of delivering a consistent and user-friendly experience. Embracing flexible, adaptive units and understanding the inherent variability of content and devices is key to building websites that bend but don't break under the strain of diversity inevitable among users, content & devices.