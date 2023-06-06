---
publishDate: null // 2019-12-28T20:47:18.322Z
title: Pixel Perfect Considered Harmful
description: Pixel Perfect Considered Harmful
excerpt: Pixel Perfect Considered Harmful
image: /images/valley_village.jpg
category: Articles
tags:
  - CSS
  - Design
canonical: https://wjv.io/blog/pixel_perfect_considered_harmful
---

# Pixel Perfect Considered Harmful

The QA response came back. My code got kicked back into ready for dev... again.
This time the sapce between the cards text and the border was bigger than the 12px shown int he figma mock up.

Nevermind the text content was different and the viewport size and aspect ratio was different between my computer and the QA person's computer.
The problem with the pixel perfect mentality is that it causes people to think that static design mocks rendered in a single aspect ratio and single viewport dimension can somehow accurately reflect how the app will look for all viewports and aspect ratios for any device out there.

Here's some CSS that should change in proportion to the viewport: font-size, white-space of any kind, padding, margin gaps, number of columns/rows, widths/heights of containers, icon sizes,

None of the above examples should be absolute pixel or rem dimensions. They should be using auto, min ocntent, max content, vw, calc, clamp or other adaptive, flexible unit lengths.

Just about the only thing I can think of as being an absolute pixel value no matter the viewport is the border thickness. Even line width in an svg graphic should probably change with the viewport size, at least clamped between some min and maximum.

