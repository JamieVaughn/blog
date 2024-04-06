---
# publishDate: null // 2023-05-09T12:35:07.322Z
title: Barnum Statements
description: Barnum Statements
excerpt: Barnum Statements
image: images/waterfall_mill.jpg
category: Articles
draft: true
tags:
  - JS
  - Logic
canonical: https://wjv.io/blog/barnum_statements
---


# Barnum Statements

What are barnum statements and what do they have to do with code?

Barnum statements are claims that, while true, are so widely applicable that they carry essentially no meaning, distinction nor substance. 
Because they have a universality to them due to their vagueness, barnum statements provide no concrete signal and so are not really actionable.
They are claims that, while not false, they are only true in a general, broad sweeping and vague sense. But as one tries to dissect them, they find they say nothing or almost nothing and so are nor really an actual claim at all.

The term Barnum statement is named for P.T. Barnum, the famous circus magnate who took advantage of the technique in his show business. The effect a Barnum Statement can have on an audience is known as the Barnum-Forer Effect, a term coined by Paul Meehl. Bertram Forer was the psychologist who coined the term "fallacy of personal validation", and who shares in the moniker with Barnum.  These sorts of statements are often used in astrology and horoscopes to elicit belief among a wide swath of a large audience no matter who they might be or what differences they might have among themselves.
The statements are carefully tailored to sound like they are specific to an individual, but are vague enough for them to apply to potentially any audience member. It is a clever and effective marketing technique of mass persuasion on a wide range of people.

Understanding Barnum statements is very useful in debate and when recognizing manipulative marketing tactics, primarily. However, they do have a somewhat curious application in code.

A plain barnum statement in code would be like this one:

```
if ( 1 + 1 > 1.5) {
    // something
} else {
    // something else
}
```

Now that is a trivial example, and one the most editors and linters will warn you about because it's ultimately a useless statement. The first `if` block will always execute and the `else` block will never execute.

But it's not hard to start disguising parts of that conditional statement in layers of indirection and variable references such that the obviousness of the statement is far less clear.

```
const fn = x => x + 1
if ( fn(1) > 1.5) {
    // something
} else {
    // something else
}
```

It's only once the program draws from an indeterminate source for data that the obviousness can truly be deemed as eliminated. So it would either have to draw from some random number source or from some kind of external input such as user input or input from another software program like and API.

```
const fn = x => x + Math.random()
if ( fn(1) > 1.5) {
    // something
} else {
    // something else
}
```
or
```
const fetchNumber = async x => fetch('/number-api').then(res => res.json()).then(data => x + data)
const num = await fetchNumber(1)
if (num > 1.5) {
    // something
} else {
    // something else
}
```

In both cases above some unknown data is produced for the program at runtime that makes if possible for the if else statement to execute either block.

In fact, the manipulative uses of barnum statements do exactly that. They dress up a claim or statement in layers of flourish so it doesn't seem obvious at first glance, but it will lead the audience fatefully down only one possible path, despite presenting other paths as possibilities in order to gain credibility.

Kolmogorov Complexity. In a sense once, you have the user input and/or program's input all programs reduce down to their barnum expression to their referentially transparent output.