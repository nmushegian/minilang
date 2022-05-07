import { test } from 'tapzero'
import { read } from './parse.js'

const fail =s=> {throw new Error(s)}
const need =(b,s)=> b || fail(s)

const lift =s=> s[0].toUpperCase() + s.slice(1)

const headpile =(ast)=> {
    if (typeof(ast) == 'string') {
        console.log(ast)
        return lift(ast)
    } else {
        return termpile(ast)
    }
}

const tailpile =(ast)=> {
    if (typeof(ast) == 'string') {
        return ast
    } else {
        return termpile(ast)
    }
}
export const termpile =(ast)=> {
    let headc = headpile(ast[0])
    let tailc = []
    if (ast.length > 1) {
        tailc = ast.slice(1).map(tailpile)
    }
    return '(' + headc + ' ' + tailc.join(' ') + ')'
}

export const rulepile =(ast)=> {
    return ast.map(termpile).join(" = ")
}

export const bookpile =(ast) => {
    return ast.map(rulepile).join('\n')
}

export const pile =ast=> bookpile(ast)

test('pile', t=>{
    let ast = read(`[dec [inc a]] [a]`)
    console.log('read ret', ast)
    let hvm = pile(ast)
    console.log(hvm)
    t.ok(hvm)
})
