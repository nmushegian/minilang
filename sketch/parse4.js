const it = require('tapzero').test
const gram = require('easygram')

const read = gram(`
book  ::= COMM* (term COMM*)+
rule  ::= term term
term  ::= COMM* '[' WS* (word WS*)+ ']' COMM*
word  ::= [a-z0-9]+
COMM  ::= ^[\[\]]+
`)

const code = `
[car [cons a b]] 
[a]
`

const read2 = gram(`
book  ::= LEAP* (rule LEAP+)+
rule  ::= term '\n' term
term  ::= word | '[' term+ ']'
word  ::= [a-z0-9]
leap  ::=  '\n\n'
`)

const code2 = `
[car [cons a b]]
a

[cdr [cons a b]]
b

[fir.step [fir.code [fir.ADD] cs] [fir.stack a b       ss]]
[fir.step [fir.code           cs] [fir.stack [add a b] ss]]

[fib 0]
0

[fib 1]
1

[fib n]
[add [fib [sub [1]       n]]
     [fib [sub [inc [1]] n]]
]

`
