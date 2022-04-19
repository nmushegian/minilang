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
sexp ::= symb S* | "[" S* sexp* S* "]" S*
symb ::= [A-Za-z0-9]+


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


const checksymb =s=> (typeof(s) == 'string' && s.length > 0)
const checktope =s=> checksymb(s) && s[0] == s[0].toUpperCase()
const checkvar  =s=> checksymb(s) && s[0] == s[0].toLowerCase()
const checklist =s=> (l instanceof Array)

test('checktope', t=>{
    t.ok(checktope('Test'))
    t.ok( ! checktope('test'))
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



        const checkleft =sexp=> {
            need(sexp.type == 'sexp', `parse panic: non-sexp at the wrong level, got ${sexp.type}`)
            need(sexp.children.length > 0, `parse panic: sexp with no children`)
            const head = sexp.children[0]
            need(head.type == 'sexp', `parse panic: unexpected structure`)
            const hsym = head.children[0]
            need(hsym.type == 'symb', `parse: sexp in lhs had a list as first item, need a symb (got: ${head.type})`)

            const tail = sexp.children.slice(1)
            const vars = {}
            for (let term of tail) {
                need(term.type == 'sexp', `parse panic: unexpected structure`)
                need(term.children.length > 0, `parse panic: unexpected structure`)
                if (term.children[0].type == 'symb') {
                    // check it is var
                    // return {'v'}
                } else {
                    const subvars = checkleft(term)
                    // merge subvars
                }
            }
            return vars
        }

        need(lhs.children.length > 0, `parse panic: lhs has no children`)
        const lexp = lhs.children[0]
        const vars = checkleft(lexp)

        // rhs expressions must not contain variables not in lhs
        need(rhs.children.length > 0, `parse panic: lhs has no children`)
        const rexp = rhs.children[0]


    }
    return book
}

test('parse code1', t=>{
    const book = parse(code0)
    t.ok(book)
    t.equal(book._src, code0)
})

module.exports = { read, parse }
