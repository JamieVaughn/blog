---
publishDate: null // 2023-05-09T12:35:07.322Z
title: Barnum Statements
description: Barnum Statements
excerpt: Barnum Statements
image: /images/waterfall_mill.jpg
category: Articles
tags:
  - JS
  - Logic
canonical: https://wjv.io/blog/barnum_statements
---


# Barnum Statements

What are barnum statements and what do they have to do with code?

Barnum statements are true, but universally applicable claims, which becuase of their universality provide no concrete distinction and so are not really actionable.
They are claims that, while not false, are so indistinct as to not be making any actual claim at all.

Understanding Barnum statements is very useful in debate and when recognizing manipulative marketing tactics, primarily. However, they do have a somewhat curious application in code.

A plain barnum statement in code would be like this one:

```
if ( 1 + 1 === 2) {
    // something
} else {
    // something else
}
```

Now that is a trivial example, and one the most editors and linters will warn you about because it's ultimately a useless statement. The first `if` block will always execute and the `else` block will never execute.

But it's not hard to start disguising parts of that conditional statement in layers of indirection and variable references such that the obviousness of the statement is far less clear.

In fact, the manipulative uses of barnum statements do exactly that. They dress up a claim or statement in layers of flourish so it doesn't seem obvious at first glance, but it will lead the audience fatefully down only one possible path, despite presenting other paths as possibilities in order to gain credibility.

