- minilang is basically [HVM]() without lambdas, only destructuring/restructuring ADTs
- minor tweaks to make it easier to write a nano interpreter
- we will try to put a type system on it similar to the one in [cedille]() but try some new term rewrite calculus ideas instead of regular dependent types for lambda calculus
- then we could consider proofs first class more so than if they were in a library, I guess, or maybe ultimately it's the same
- point is that in any case we want this thing to prove its own correctness and lay foundation for proving correctness about self optimizations

---

Minilang is term rewrite system, a tiny language-specification language.

The long term goal is that you can
- Define a language
- Write a correct-by-construction optimizing compiler for your language using your language
- Bootstrap your compiler directly from minilang

The big idea is that you can use higher level constructs that you invent specifically to be able
to write correct-by-construction compilers, and know that their output is actually correct,
without having to write the compiler in a language whose implementation has been proven correct.
That's because you did: you used minilang.

But how do we know that the minilang implementation is correct? The answer is that it has to be
simple enough that we can verify the minilang kernel binary manually in our "axiom" language, like x86
or some other hardware assembly, and then it becomes a hardware bootstrapping problem.

