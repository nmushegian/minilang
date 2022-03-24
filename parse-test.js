const it = require('tapzero').test

const p = require('./parse.js').parse
const show =o=> console.dir(o, {depth:null})

it('parses', t => {
    const ast = p(`('a .b) -+ (.a)`)
    //show(ast)
    t.equal(ast.type, 'rule')
    t.equal(ast.children.length, 2)
})

it('no parse bad var/val org', t=>{
    const ast = p(`(.a 'b) -+ (.a)`)
    //show(ast)
    t.equal(ast, null)
})
