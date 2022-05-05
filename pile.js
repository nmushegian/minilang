import { test } from 'tapzero'
import { read } from './parse.js'

const fail =s=> {throw new Error(s)}
const need =(b,s)=> b || fail(s)


export function _pile(term) {
    if (term.type == 'term') {
        let subterms = term.children.map(_pile)
        need(typeof(subterms[0]) == 'string', `panic: head is not a string, ${subterms}`)
        let head = subterms[0]
        console.log(head)
        head = head[0].toUpperCase() + head.slice(1)
        return '(' + head + subterms.join(' ') + ')'
    }
    fail(`panic: unrecognized ast type: ${ast.type}`)
}

export function pile(ast) {
    need(ast.type == 'book')
    let hvm = ''
    for (let rule of ast.children) {
        let lhs = _pile(rule.children[0])
        let rhs = _pile(rule.children[1])
        hvm += `\n${lhs} = ${rhs}\n`
    }
    return hvm
}

test('pile', t=>{
    let hvm = pile(read(`[dec [inc a]] [a]`))
    console.log(hvm)
    t.ok(hvm)
})
