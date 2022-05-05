const it = require('tapzero').test
const gram = require('easygram')

const read = gram(`
book  ::= COMM* (term COMM*)+
rule  ::= term WS* term
term  ::= COMM* '[' WS* (word WS*)+ ']' COMM*
word  ::= [a-z0-9]+
COMM  ::= WS+
WS    ::= [ \n]+
`)

const code = `[car [cons a b]] [a]`

it('nobare', t=>{
    let ast = read(code)
    console.log(ast)
})

const read2 = gram(`
book  ::= LEAP* (rule LEAP+)+
rule  ::= term '\n' term
term  ::= word | '[' term+ ']'
word  ::= [a-z0-9]
LEAP  ::=  '\n\n'
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
