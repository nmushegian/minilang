const test = require('tapzero').test
const toss =s=> { throw new Error(s) }
const need =(b,s)=> b ? b : toss(s)

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

const code0 = `
- [List x [Unit y]]
+ [[Cons a b]]

-[ Rule2[x y z] ]
+ [List x y]
`

const code1 = `- [Car [Cons x y]] + x`

const read = gram(`
book ::= S* rule+ S*
rule ::= lhs rhs
lhs  ::= "-" S* sexp
rhs  ::= "+" S* sexp
symb ::= [A-Za-z0-9]+

sexp ::= symb S* | "[" S* sexp* S* "]" S*
S   ::= [ \n]+
`)

test('read code0', t=>{
    const ast = read(code0)
    t.ok(ast)
    console.log(show(ast))

})

test('read code1', t=>{
    const ast1 = read(code1)
    t.ok(ast1)
})

// some basic static checks on top of `read`, then put
// it in a representation native to environment
const parse =src=> {
    const ast = read(src)
    const book = {}
    need(ast, `parse: read failed to return an AST, silent parse error`)
    need(ast.type == 'book', `parse: top-level expression is not a rulebook, got ${ast.type}`)
    book._src = src
    book._ast = ast
    for( let rule of ast.children ) {
        need(rule.type == 'rule',
            `parse: second-level expression is not a rule, got ${rule.type}`)
        const lhs = rule.children[0]
        const rhs = rule.children[1]
        need(lhs.type == 'lhs', `parse: LHS of rule was not parsed as LHS, got ${lhs.type}`)
        need(rhs.type == 'rhs', `parse: RHS of rule was not parsed as RHS, got ${rhs.type}`)

        const collect =sexp=> {
            console.log('test', sexp)
            console.log('text', sexp.text)
            const c0 = sexp.text[0]
            if (sexp.type == 'symb' && c0 == c0.toLowerCase()) {
                return sexp.text
            } else {
                return ([]).concat(sexp.children.map(collect))
            }
        }
        const vars = collect(lhs)
        console.log(vars)
        // lhs expressions must all start with topes (symbols with capital letters)
        // rhs expressions must not contain variables not in lhs
    }
    return book
}

test('parse code1', t=>{
    const book = parse(code0)
    t.ok(book)
    t.equal(book._src, code0)
})

module.exports = { read, parse }
