

`

math {
  sub {
    1 [inc .n]  / .n
  , .k [inc .n] / math sub [math sub 1 .k] .n
  }
, add {
    1 [inc .n]  / inc .n
  , .k [inc .n] / add .n [inc .k]
  }
}

math {
  sub {
    1 [inc .n]  / .n
  , .k [inc .n] / math sub [math sub 1 .k] .n
  }
, add {
    1 [inc .n]  / inc .n
  , .k [inc .n] / add .n [inc .k]
  }
}


(stdin / ( .i |
  { sub 1 [inc .n]  / .n
  , sub .k [inc .n] / sub [sub 1 .k] .n
  }
))

stdin .i / stdout (.i | rules)

(stdin | {(.i / stdout (.i | rules))})

stdin / ( stdin | { .i / [stdout (
  { sub { 1 [inc .n]  / .n
        , .k [inc .n] / sub [sub 1 .k] .n
        }
  }
)})

(io | \ stdin .i / stdout (fib .i |
  \ fib \  0 / 0
        \  1 / 1
        \ .n / fib [add [sub 1 .n]
                        [sub [inc 1] .n]]
  \ sub \  1 [inc .n]  / .n
        \ .k [inc .n]  / sub [sub 1 .k] .n
  \ add \  1 [inc .n]  / .n
        \ .k [inc .n]  / add .n [inc .k]
))

| fib .i
\ fib \  0 / 0
      \  1 / 1
      \ .n / fib [add [sub 1 .n] [sub [inc 1] .n]]

| fib .i
/ fib / 0 \ 0
      / 1 \ 1
      / .n \ fib [add [sub 1 .n] [sub [inc 1] .n]]

! io / stdin .i \ stdout
! fib .n
/ fib 0 \ 0
    / 1 \ 1
    / .n \ fib [add [sub 1 .n] [sub [inc 1] .n]]

- fib - 0 > 0
  -   - 1 > 1
  -   -.n > fib [add [sub 1 .n] [sub [inc 1] .n]]
- add - 1 [inc .n] > n
  -   -.k [inc .n] > sub [sub 1 .k] .n


/ main .i \ .i |

  / sub / 1 [inc .n]  \ .n
        / .k [inc .n] \ sub [sub 1 .k] .n
  / add / 1 [inc .n]  \ .n
        / .k [inc .n] \ add .n [inc .k]



`
