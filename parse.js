import { test } from 'tapzero'
import { default as gram } from 'easygram'

const fail =s=> { throw new Error(s) }
const need =(b,s)=> b || fail(s)

export const _read = gram(`
{ws=implicit}
book ::= rule* EOF?
rule ::= term term
term ::= word | '[' term term* ']'
word ::= [a-z\.]+  {ws=explicit}
WS   ::= [ \n]+
`)

const show =s=> JSON.stringify(s, null, 2)

const flat =ast=> {
    if (ast.type == 'book') {
        return [flat(ast.children[0])]
    }
    if (ast.type == 'rule') {
        return [ flat(ast.children[0])
               , flat(ast.children[1]) ]
    }
    if (ast.type == 'term') {
        if (ast.children.length == 1) {
            if (ast.children[0].type == 'word') {
                return ast.children[0].text
            } else {
                return [flat(ast.children[0])]
            }
        } else {
            return ast.children.map(flat)
        }
    }
    fail(`panic: bad parse`)
}

const read =s=> {
    const ast = _read(s)
    return flat(ast)
}

test('read', t=>{
    let ast = read(`[abc [def]] [abc]`)
    t.ok(ast)
    console.log(show(ast))
    // book,rule,lhs,word
    t.equal(ast[0][0][1], 'def')
})

test('_read', t=>{
    let ast
//    ast = _read(`abc abc`)
//    t.ok(ast)

    ast = _read(`[abc] [abc]`)
    t.ok(ast)

    ast = _read(`[abc] [xyz]`)
    t.ok(ast)

    ast = _read(`
[fir [step] [code [op.add] cs] [state a b        ss]]
[fir [step] [code          cs] [state [[add a b] ss]]]
`)
    t.ok(ast)
})

