---
publishDate: 2021-01-18T05:25:07.322Z
title: Composition over Inheritance and Revisiting the Null Object Pattern
description: Composition over Inheritance and Revisiting the Null Object Pattern
excerpt: Composition over Inheritance and Revisiting the Null Object Pattern
image: images/floating_elevator.jpg
category: Articles
tags:
  - JavaScript
  - Functional
canonical: https://wjv.io/blog/nothing_is_something
---

Sandi Metz delivered a fantastic [conference talk](https://www.youtube.com/watch?v=OMPfEXIlTVE) about Composition called "Nothing is Something." This article is a summary of what I learned from this talk.

## Favor Composition Over Inheritance

Inheritance is for specialization, which is needed far less than one might assume. Composition provides a way to create units of pluggable behavior. While inheritance sets out to make code reusable, it actually often leads to code duplication if used for things it is not intended. And there are very few instances where inheritance is actually the correct tool for the job. Composiiton ends up being a better tool for the job more often. It lets us avoid code duplication and couple two or more behaviors together in any permutation without code duplication.

Inheritance often fails to provide a similar behavior because if any inherited method is not needed by the child or needs to be overwritten for the child's use case, then the benefit of the inheritance is lost. In order to to ensure that there are never unnecessary properties or methods inherited by the child, one could reduce parent classes down to a single property or method. But this either requires multiple inheritance (which not all languages support) or requires writing extra code in the child that is not represented in the parent you chose to inherit from. That extra code may even be in another class, that is simply unable to shared now because of the constraints of inheritance.

Composition uses functions that can be passed and invoked anywhere without the constraints of inheriting classes. This means that functions can essentially be used like multiple inheritance would be by default.

## Finding the Composable Algorithm

Composition can be tricky at first because some behaviors are not obviously expressed as an algorithm at first glance. But when you have the urge to use inheritance because you think the new thing needs to specialize, then most of the time, the thing you are specializing on is simply a different behavior of what the parent object behavior is. So that's a clue that maybe Composition can be used there. The parent object behavior is still an algorithm, it just needs to be extracted out into the form of a function. Sometimes the algorithm (in the FP paradigm: a callback) is one that does nothing, but that is still something: it is a no-op function... a function that is just returning some chunk of unmodified state or some type of empty value.

Here are a set of steps to help you identify the role/behavior that is at work:

1. Figure out what is varying (what are the algorithms of each behavior actually doing, even if it is "nothing")
2. Name that role, behavior or trait (i.e. 'order', 'repeatNTimes', 'format', 'randomize')
3. Define that role (make API's for it that can be plugged into anywhere)
4. Inject the executor

> Order is not a House, Order is a role.

**Sandi Metz**

![Nothing is Something!](/img/composition.png)

In the example in the talk from which the above table is reprinted, there is a different sorting algorithm for the phrases in the House Class. Instead of inheriting different orders of the phrases, simply instantiate the phrase and inject different sorting algorithms to re-order the phrases. For the House that needs the phrases in the starting order, simply inject a no-op function as the sorting algorithm: thus "Nothing is Something"... a No-op function is the Algorithm needed for that case.

## OOP

Inheritance is often presented as an essential part of Object Oriented Programming. But this talk claims that Composition paired with Dependency Injection is also Object Oriented Design. Object Oriented Composition is injecting an object (or function) with a behavior (algorithm) to play the role of the thing that you want to vary. This is a more flexible and less error-prone compared to inheriting the algorithm you want to vary.

The Composition and behavior injection approach is actually more true to what Alan Kay meant when he coined the term "Object Oriented Programming."

> OOP to me means only messaging, local retention and protection and hiding of state-process, and extreme late-binding of all things.

> ...the very first problems I solved with my early Utah stuff was the "disappearing of data" using only methods and objects. At the end of the 60s (I think) Bob Balzer wrote a pretty nifty paper called "Dataless Programming", and shortly thereafter John Reynolds wrote an equally nifty paper "Gedanken" (in 1970 I think) in which he showed that using the lamda expressions the right way would allow data to be abstracted by procedures.

> The people who liked objects as non-data were smaller in number, and included myself, Carl Hewitt, Dave Reed and a few others -- pretty much all of this group were from the ARPA community and were involved in one way or another with the design of ARPAnet → Internet in which the basic unit of computation was a whole computer.

...

> I was too blythe about the term back in the 60s and should have chosen something like "message oriented"

**Alan Kay** ([source](https://softwareengineering.stackexchange.com/questions/46592/so-what-did-alan-kay-really-mean-by-the-term-object-oriented))

What he meant was something actually a bit closer to Functional Programming it seems, where messages are passed between objects to trigger behaviors. And Composition extends this to pass around algorithms as messages for the objects to execute as their behaviors.

## Final Take Aways

The Composition strategy is especially helpful with the Null Object Pattern. It can potentially allow us to stop checking for and handling `null` in all our functions. Instead, we can use an object to stand in for `null` and use those "active nothings."

Beware of inheritance. Inheritance is NOT for sharing behaviors. It's for specialization.
There is no such thing as ONE specialization. Define the role instead
Remember that Nothing is Something. In every program there are things that manifest as the absence of an algorithm or code, so represent it by the thing that manifests nothing: the no-op function. The no-op is analagous to the Zero in the number system, and just as important because it keeps the object messaging API surface consistent even for otherwise inconsistent behaviors.
