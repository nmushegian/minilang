const it = require('tapzero').test

const p = require('./parse.js').parse
const show =s=> JSON.stringify(s, null, 2)

it('parses', ()=>{
    const ast = p(`('a .b) -+ (.a)`)
    console.dir(ast, {depth: null})
    /*
    p(`
(a b c) | (b b c)
    `)
*/
})
