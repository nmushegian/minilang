// interpreter

import { test } from 'tapzero'
import { read } from './parse.js'

const fail =s=> {throw new Error(s)}
const need =(b,s)=> b || fail(s)

const code = `
[dec [inc a]] [a]
`

export function match(pat, exp) {
    try {
        pat = pat.children
        need(Array.isArray(pat), `pat is not a list: ${pat}`)
        need(pat.length > 0, `empty pattern`)
        let head = pat[0]
        let args = pat.slice(1)
        let rest
        if (pat.length >= 2) {
            rest = pat[pat.length-1]
        }
        return [null, {}]
    } catch (e) {
        return [e.message, null]
    }
}

export function write(bag, wat) {
    return [null, []]
}

test('match', t=>{
    let ast = read(code)
    t.ok(ast)
    t.equal(ast.type, 'book')
    let rule = ast.children[0]
    let pat = rule.children[0]
    let wat = rule.children[1]

    t.equal(pat.type, 'term')
    t.equal(pat.type, 'term')
    let exp = ['dec', ['inc', '5']]

    let [ierr, bag] = match(pat, exp)
    t.equal(null, ierr)
    t.ok(bag)
    t.equal(bag['a'], '5')

    let [oerr, out] = write(bag, wat)
})
