const it = require('tapzero').test
const gram = require('easygram')

const code = `
- [List x [Unit y]]
+ [[Cons a b]]

-[ Rule2[x y z] ]
+ [List x y]
`

const read = gram(`
book ::= S* rule+ S*
rule ::= "-" S* sexp S* "+" S* sexp S*
symb ::= [A-Za-z0-9]+

sexp ::= S* symb S* | S* "[" S* sexp* S* "]" S*
S   ::= [ \n]+
`)

show =ast=> {
    return `( ${ast.type + " " + ast.children.map(show)} )`
}

it('read', t=>{
    const ast = read(code)
    t.ok(ast)
    console.log(ast)

})
