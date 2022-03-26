const it = require('tapzero').test

const c0 = `
if 0 a b | a
if 1 a b | b

if 0 a _ | a
if 1 _ b | b

if { 0 a _ | a
   , 1 _ b | b }

[let x be e in [a, b]] | [(let x be e in a), (let x be e in a)]


[fib 0]  | 0
[fib 1]  | 1
[fib .n] | [add [fib [sub 1 .n]] [fib [sub 2 .n]]]

[sub 1  [inc .n]] | .n
[sub .k [inc .n]] | [sub [sub 1 .k] .n]
[add 1 .n]        | inc .n
[add [inc .n] .k] | [add .n [inc .k]]


main {
  input .n | output (fib .n)

  math { sub { 1  [inc .n]   | .n
             , .k [inc .n]   | sub [sub 1 .k] .n  }
       , add { 1 .n          | inc .n
             , [inc .n] .k   | add .n [inc .k]    }}

  fib { 0  | 0
      , 1  | 1
      , .n | math add
              [fib [math sub 1 .n]]
              [fib [math sub [inc 1] .n]]  }
}

math {
  sub {
    1  [inc .n]   | .n
  , .k [inc .n]   | sub [sub 1 .k] .n
  }
, add {
    1 .n          | inc .n
  , [inc .n] .k   | add .n [inc .k]
  }
}

`

