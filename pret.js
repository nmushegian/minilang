// interpreter

import { test } from 'tapzero'
import { read } from './parse.js'

const fail =s=> {throw new Error(s)}
const need =(b,s)=> b || fail(s)

export function match(pat, exp) {
    try {
        pat = pat.children
        need(Array.isArray(pat), `pat is not a list: ${pat}`)
        need(pat.length > 0, `empty pattern`)
        need(exp.length > 0, `empty expression`)
        let head = pat[0].text
        need(typeof(head) == 'string', `head is not a string: ${head}`)
        let hexp = exp[0]
        need(typeof(hexp) == 'string', `hexp is not a string: ${hexp}`)

        let subs = {}
        for(let i = 1; i < pat.length; i++) {
            let child = pat[i]
            need(child.type == 'term', `panic: malformed AST`)
            need(child.children.length > 0, `panic: malformed AST`)
            if (child.children.length == 1) {
                child = child.children[0]
                need(child.type == 'word', `panic: single item term is not word`)
                need(child.text == exp[i], `match fail: ${child.text} ${exp[i]}`)
                return [null, {}]
            }
            let children = child.children
            let [err, subvars] = match(pat[i], exp[i])
            need(!err, err.message)
            for (let [k,v] of Object.entries(subvars)) {
                need(!subs[k], `duplicate variable: ${k}`)
                subs[k] = v
            }

        }

        let vars = pat.slice(1)
        let rest
        if (pat.length >= 2) {
            rest = pat[pat.length-1]
        }
        return [null, {}]
    } catch (e) {
        return [e, null]
    }
}

export function write(bag, wat) {
    return [null, []]
}

test('match', t=>{
    let ast = read(`[dec [inc a]] [a]`)
    t.ok(ast)
    t.equal(ast.type, 'book')
    let rule = ast.children[0]
    let pat = rule.children[0]
    let wat = rule.children[1]

    t.equal(pat.type, 'term')
    t.equal(pat.type, 'term')
    let exp = ['dec', ['inc', '5']]

    let [ierr, bag] = match(pat, exp)
    console.log(ierr)
    t.equal(null, ierr)
    t.ok(bag)
    t.equal(bag['a'], '5')

    let [oerr, out] = write(bag, wat)
})
