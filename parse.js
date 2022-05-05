const { test } = require('tapzero')
const gram = require('easygram')

let read = gram(`
{ws=implicit}
book ::= rule* EOF?
rule ::= term term
term ::= word | '[' term term* ']'
word ::= [a-z\.]+  {ws=explicit}
WS   ::= [ \n]+
`)

test('read', t=>{
    let ast = read(`word`)
    console.log(ast)
    ast = read(`abc abc`)
    console.log(ast)
    t.ok(ast)

    ast = read(`[abc] [abc]`)
    t.ok(ast)

    ast = read(`[abc] [xyz]`)
    t.ok(ast)

    ast = read(`
[fir [step] [code [op.add] cs] [state a b        ss]]
[fir [step] [code          cs] [state [[add a b] ss]]]
`)
    t.ok(ast)
})

