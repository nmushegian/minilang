const test = require('tapzero').test

const gram = require('easygram')

const show =(ast,d=0)=> {
    let s = "("
    s += ' '.repeat(d)
    s += `${ast.type} <" ${ast.text.trim()} "> \n`
    let subs = ast.children.map(c=>show(c, d+2))
    s += subs.join("\n")
    s += ")"
    return s
}

const code = `
- [List x [Unit y]]
+ [[Cons a b]]

-[ Rule2[x y z] ]
+ [List x y]
`

const code1 = `- [Car [Cons x y]] + x`

const read = gram(`
book ::= S* rule+ S*
rule ::= "-" S* sexp "+" S* sexp
symb ::= [A-Za-z0-9]+

sexp ::= symb S* | "[" S* sexp* S* "]" S*
S   ::= [ \n]+
`)

test('read code0', t=>{
    const ast = read(code)
    t.ok(ast)
    console.log(show(ast))

})

test('read code1', t=>{
    const ast1 = read(code1)
    t.ok(ast1)
})
