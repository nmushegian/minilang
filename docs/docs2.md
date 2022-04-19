People who study programming languages sometimes use a language called "Meta Language".
When we know we are talking about programming languages, we can also say "ML".
When most programmers hear the name "Meta Language", here is some things they might think:
- ML is 'above' or 'outside' of other languages
- To learn ML, it helps to know a lot of languages
- ML is most useful for talking about other languages
- ML is used by people solving different problems from me
- ML is for research, used to discover things that might be useful, and then it can usually be expresed more easily in a more familiar language
- Most programmers probably won't find ML to be useful for them directly
- It's probably not worth the effort to try to learn ML

I'm making a language similar to ML, but it is named "minilang". I named it that
because I want it to be that when programmers hear that name, they think things more like this:
- minilang is small
- if you know any programming language, then you can learn minilang fast
- if you don't know a programming language, minilang might be a way to 'dip your toes'
- languages can all express each other, so it might be easier to think of complex languages in terms of minilang
- if it's easy to learn and it might be useful, I should give it a try

That is how I would explain the difference between ML and minilang to someone who doesn't know
much about programming languages. To someone who knows a lot about programming languages, I would explain it like this:

ML is based on typed lambda calculus. It is actually a family of languages with type systems that
evolved over time as type theory evolved. ML is used to model all kinds of computations
and anything could be expressed in terms of ML by using the type system as it is.
Haskell and Ocaml are examples of ML-family languages that might be used to solve real problems.

There are some other languages like K, Isabelle, and Coq which are also used to reason about
languages and computations. They use more modern type theory to build the system to be
oriented around proofs that programs we write are correct, meaning they behave like we intend.
These are 'hybrid' languages that have a basic core built on a something called a *typed term rewrite system*,
and then a higher-order language that incorporates first-order logic to make statements about the core language.
The idea is that you model a computational universe with the inner language and write proofs with the other language.

Minilang is based on one particular view of the type theory of term rewrite systems. The definition
of minilang is small and it corresponds just the core term rewrite system inside of these proof
assistant languages. It can be viewed as a very small extension of the calculus of constructions used in Coq,
but the language is a clean slate design.
Instead of having a particular higher-order system, the minilang project
will instead focus on building a 'language tower' up to higher level programming language constructs,
so that the proof assistant layer can have an understanding of itself. This is possible without some
kind of infinite recursion or logical paradox with just two limitations: No finite language can express all possible types,
and you will have to prove to yourself that the minilang language kernel is correct without using any minilang implementation.