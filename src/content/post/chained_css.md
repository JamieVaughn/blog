---
publishDate: 2019-12-29T12:35:07.322Z
title: Chained CSS Classes - A Proposal
description: A thought experiment on what BEM CSS could look like as simply chained classes...
excerpt: A thought experiment on what BEM CSS could look like as simply chained classes...
image: images/waterfall_mill.jpg
category: Articles
tags:
  - CSS
  - HTML
canonical: https://wjv.io/blog/chained_css
---

## BEM - We've always done it this way.

For many developers, Block Element Modifier (BEM) is a beloved CSS naming convention for authoring CSS class names in a more systematic, extensible and maintainable way. It creates a taxonomy of CSS components based on a top-level **block** (i.e. the component wrapper) and any **element** within that component and finally any stylistic **modifier** that can be applied to one of those elements. The BEM style of authoring CSS classes looks like this:

```css
.Block__Element--Modifier {
  property: value;
}
```

The choice of using a single class to semantically contain the entire block-element-modifier hierarchy is intentional. It reduces specificity of any given HTML element so that overwriting styles later on is less tedious. Unfortunately, this comes with the unwelcome side effect of being rather verbose.

Now, if you only need the element or only the modifier you can reduce the verbosity like so:

```css
/* Block component */
.card {
}
/* Element that depends upon the block */
.card__title {
}
/* Modifier that changes the style of the block */
.card--large {
}
/* Modifier that changes the style of an element within the block */
.card__title--large {
}
```

But even so, this forces an incredible amount repitition within the HTML document. You must at minimum repeat the **block** name on nearly every child of the block... and you will likely be repeating the **element** names excessively, as well.

```html
<div class="block block__card--med">...</div>
<div class="block__card--large block__card--dropshadow">...</div>
```

Gross 🤢 !

And if you need to add multiple modifiers, I'm not certain what the preferred syntax is between long chains of `block__element--modifier1--modifier2` or repeating the entire thing: `block__element--modifier1 block__element--modifier2`. You can always make sure you author your **modifier** so that every style is comprehensive to avoid such a repetitious situation, but then you will find yourself repeating chunks of style properties elsewhere in other modifiers which share portions of styles but not 100% of those styles. CSS pre-processors can come to the rescue here to a degree by taking advantage of `mixins` and `extends` syntax. But it's only a band-aid... there's a verbosity problem that is at the root of this organizational rubric.

Is there a way to get the hierarchical organization without such verbosity? Maybe by just using simple CSS classes as they were originally intended?

## What about a systematic method of chaining CSS classes?

Let's try to take the Block, Element, Modifier system from BEM but reimagined it with simpler CSS class naming conventions. What might that look like?

```css
/* Block component */
.card {
}
/* Element that depends upon the block */
.card .title {
}
/* Modifier that changes the style of the block */
.card.large {
}
/* Modifier that changes the style of an element within the block */
.card .title.large {
}
```

Here now we significantly reduce the amount of extra text in our HTML markup because there is no need to repeat the `card` class or the `title` class more than a single time per component. And with CSS pre-processors the CSS actually improves more than our BEM counterpart because we do not even need to repeat the `card` class more than once for the component with the help of nesting:

```css
.card {
  &.large {
  }
  .title {
    &.large {
    }
  }
}
```

Now, we do increase the specificity of our selectors somewhat but not drastically. We start creeping up to a specificity of around 30 (or a perhaps bit more if several modifiers are tacked on), instead of only 10. I don't see that as a deal breaker, myself. And if that is something that is especially concerning, then we can take advantage of the new `:where()` selector in CSS, because that affords us a nesting like syntax and omits any specifity contribution from selectors within it. With `:where()` we can tack on as many modifiers as we want without increasing the css. For example:

```css
/* These have specificity of 10 */
:where(.block) .element:where(.modifier, .large, .dropshadow, .primary) {
}
:where(.block) .element :where(.modifier, .large, .dropshadow, .primary) {
}
```

And we get all of that without even the need of more complicated mixins! Our modifier classes become our mixins and we define a set of "global" baseline modifiers with basic styles that all instances of the modifier would use. And then simply add the unique styles to the nested instances of the modifiers as required by the block and element they appear in. Let's see an example of that:

```css
.large {
  font-size: 2em;
}
.card {
  .title {
    &.large {
      font-weight: bold;
    }
  }
}
.nav {
  .link {
    &.large {
      letter-spacing: 2px;
    }
  }
}
```

## Where have I heard "Element" before?

I don't know about you, but that looks nicer to me! But wait could we further reduce the verbosity by rethinking the **element** from the BEM convention? Why don't we just use the HTML Element tag names as the **element** naming convention? There's a certian semantic resonance in that, isn't there? so Our example above would be shortened to:

```css
.large {
  font-size: 2em;
}
.card {
  h2 {
    &.large {
      font-weight: bold;
    }
  }
}
.nav {
  a {
    &.large {
      letter-spacing: 2px;
    }
  }
}
```

This might not look like much of a change, but it does two things. First, we reduce our specificity back down to almost where the minimum BEM convention would have it. Second, we further reduce our HTML clutter by removing the need for more classes on **element** level HTML tags. And as long as the tags are children of the **block** there will be no style collisions! 🙌

One last piece of organization that is possible (but entirely optional) is separating out each of the levels of css into its own file:

<table>
    <thead>
        <tr>
            <th>Block</th>
            <th>Element</th>
            <th>Modifier</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>.Header</code></td>
            <td><code>.title</code></td>
            <td><code>.bold</code></td>
        </tr>
        <tr>
            <td>blocks.css</td>
            <td>elements.css</td>
            <td>modifiers.css</td>
        </tr>
    </tbody>
</table>

And then one more file called `chains.css` could be added for including chained css that has three levels of chaining (`.Header.title.bold`)when its necessary to do so to overwrite other css rules or customize things further.
