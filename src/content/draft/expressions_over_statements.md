---
# publishDate: null // 2023-05-09T12:35:07.322Z
title: Expressions Over Statements
description: Expressions Over Statements
excerpt: Expressions Over Statements
image: /images/prism_space.webp
category: Articles
draft: true
tags:
  - JS
  - Functional
canonical: https://wjv.io/blog/expressions_over_statements
---

## Everything is an expression

An expression is any line or block of code that resolves to a value.

At its most basic, expressions are evaluated to produce a value. Expressions are in contrast to statements, which are a line or block of code that that executes to make something happen but does not resolve to a value itself. In other words, it's a line or block of code that generates side effects.

Here’s a general rule of thumb: If you can print it, or assign it to a variable, it’s an expression. If you can’t, it’s a statement.

determine

de term ine 
de => of
ine => like or having nature of https://www.etymonline.com/word/-ine

term => a math term, a symbol of a formula

the whole program is a formula made of terms.

the whole program can collapse into a single value due to referential transparency if constructed in de-term-ined ways.

expressions can still have side effects:
let a;
let b = 1 + (a = 2); // a=2 is an expression that evaluated to 2, and has a side effect of reassigning “a”, this is actually called an expression statement.

Also, and perhaps more importantly, function statements (a.k.a function declarations) inside a function f form part of the execution context that gets created when function f is invoked. However, function expressions do not form part of that execution context.
One often quoted effect of that is that function declarations get "hoisted" whereas function expressions do not. Function Declarations increase the amount of space necessary to hold an execution context and thus eat up stack space a little faster and so slightly decrease the maximum recursion depth. The depth difference comes from different number of variables. statement style introduces a new variable g in scope, expression style does not. when adding let g= before expression, then the depths will be equal

Expression: a unit of code that resolves to a value, as instance, literals & operators. Examples for expressions:
> 3
> 1 + 2
> "expression"
> fn()
> []
> {}
Statement: a unit of code representing one instruction or more, usually starts with a language reserved keyword and ends, explicitly or implicitly, with a statement terminator. Examples of statements:
> 3;
> let x = 3;
> if () {}
> for () {}
> while () {}


important points:
- no side effects
- referential transparency
- pure functions have referential transparency
- return values
- assignments
- composition
- deteriministic evalutaion
- immutable state
- 
- all of this combines to make it easier to reason about the correctness of a program and also to be successful in debugging, extending & maintaining software.



expressions vs. statements
https://masteringjs.io/tutorials/fundamentals/expressions
https://programming.guide/statements-vs-expressions.html
https://2ality.com/2012/09/expressions-vs-statements.html

in lisps everything is an expression


jslisp?

lisp.js?

jisp?

* 		functional programming
* 		is a style of programming in which
* 		expressions are more important than using statements.
* 		What we want to do is: we want to compose programs using expressions
* 		and these expressions deliver a value so we take two expressions that deliver a
* 		value
* 		and compose them in a bigger expression.
* 		Compare and contrast that with writing your program using statements.
* 		When you compose statements the statements have an implicit side-effect
* 		on the global state and they communicate values via that global
* 		state.
* 		Whereas in an expression based
* 		programming style expressions return values
* 		and we compose these values directly. A functional programming language
* 		 A functional programming language
* 		is a language that supports and encourages
* 		writing code using expressions.
* 		most modern languages
* 		now support this style. And they support the style
* 		specifically by supporting lambda expressions.


declarative relies on expressions while procedural/imperative uses statements
Declarative code follows the general attitude of `.map()` in that a declaration will cause a transform pipeline to execute which yield a one-to-one result with what's expressed.
