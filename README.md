### minilang

Minilang is term rewrite system, a tiny language-specification language.

The long term goal is that you can
- Define a language
- Write a correct-by-construction optimizing compiler for your language using your language
- Bootstrap your compiler directly from minilang

The big idea is that you can use higher level constructs that you invent specifically to be able
to write correct-by-construction compilers, and know that their output is actually correct,
without having to write the compiler in a language whose implementation has been proven correct.
That's because you did: you used minilang.

But how do we know that the minilang implementation is
correct? The answer is that we can implement it in under 1kb of x86-64 code, which is tractable
for humans to verify themselves. We can supplement with proofs in non-bootstrapped proof assistants.
We can do this. Have a look at [sectorlisp](https://github.com/jart/sectorlisp) for inspiration.
Have a look at [ape binaries](http://justine.lol/ape.html) by the same author to see how we could
realistically export proofs from a bare metal environment into a POSIX environment and use stdio.

If this works, programming language design will be reduced to specifying semantic-invariant-preserving
transformations that operate on *computations* (which includes the compilation phase), which can be generalized and
packaged into a "language toolkit" similar to how LLVM turned a many-to-many problem into two many-to-one problems.

### examples

Here is an example of how you would implement factorial directly in minilang (assume arithmetic terms are defined):

```
fact 0 = 1
fact n = mul n [fact [sub n 1]]
```

Using term rewrite rules you can define languages, then you can use those languages to define more languages
which all compile down to term rewrite rules.

Let's make a slightly more readable version by first creating `let`, `if`, and `eq` forms:

```
let x be y in x = y
let x be y in y = y
let x be y in <a b> = <[let x be y in a], [let x be y in b]>

eq a a = 1    // structural equality (used for destructuring arguments) is native to minilang
eq a b = 0

if 0 a b = b
if 1 a b = a
```

Note that everything is concrete values in the terms! We are defining what those forms mean.
There are no native forms except '[]' for nesting, '<>' for explicit cons, and '=' for delineating the two sides of the rules.

Now we can rewrite our factorial like this:

```
fact n = let m be [sub n 1] in
           [if [eq n 0] 1 m]
```

Ok, maybe this isn't actually more readable. But it shows you how you can use term rewrite rules to express familiar
language constructs that would be too complex to write out directly.

As an example, let's examine one rule and look at its concrete form.
Here is one of the rules with explicit commas, and with quotes added to emphasize that these are concrete values.

```
["let", "x", "be", "y", "in", "x"] = "y"
```

And here it is in raw explicit cons S-expression form. We removed the quotes again. Just remember these are values, not symbols.

```
<RULE <<let <x <be <y <in <x <>>>>>>> <<>, <>> >>
```

Finally it is worth mentioning that special characters are not special and can be used as part of terms.
So a syntax like so is possible without a separate 'frontend' pass:

```
fun fact(n):
  if n == 0 return 1
  else return fact(n-1)
```