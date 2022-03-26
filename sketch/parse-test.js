const it = require('tapzero').test

const p = require('./parse.js').parse
const show =o=> console.dir(o, {depth:null})

it('parses', t => {
    const ast = p(`('a .b) -+ (.a)`)
    //show(ast)
    t.equal(ast.type, 'rule')
    t.equal(ast.children.length, 2)
})

it('nesting', t=>{
    const ast = p(` ('a ('c .b)) -+ (.a) `)
    t.equal(ast.type, 'rule')
    //show(ast)

    const ast2 = p(` ('a 'b ('c .d .e)) -+ (.e)`)
    //show(ast2)
    t.equal(ast.type, 'rule')
})

it('val in nested exp after var', t=>{
    const ast = p(`  ('a .b ('c .d)) -+ (.d)  `)
    //show(ast)
    t.equal(ast.type, 'rule')
})

it('no parse bad var/val org', t=>{
    const ast = p(`(.a 'b) -+ (.a)`)
    //show(ast)
    t.equal(ast, null)
})

it('multi case simple', t=>{
    const ast = p(`
('a 'b .x) -+ ('b .x)
('a 'c .x) -+ ('c .x)
`)
    const ast2 = p(`
~f ('a 'b '0) + '0
 - ('a 'b .x) + ('b .x)
 - ( - 'c .x) + ('c .x)
`)
    show(ast)
    t.ok(ast)
})

it('multi case nested', t=>{
    const ast = p(`
~f
 - ('a ('b 'c .x))       + f ('0 .x)
 - ( - ( - 'd .x))       + f ('0 'd)
 - ( - ( - 'e .x) ..)    + f ('1 .x ..)
 - ('z ('1 .y))          + ('2)
 - ('x 'y 'z 'w '2)      + 'z
 - ( -  - ('a 'w '2))    + f 'w
`)
;
`
('f ('a ('b 'c .x)))     |  ('f ('0 .x))
('f ('a ('b 'd .x)))     |  ('f ('0 'd))
('f ('a ('b 'e .x) ..))  |  ('f ('1 'd ..))
('f ('z ('1 .y)))        |  ('2)
('f ('x 'y 'z 'w '2))    |  'z
('f ('x 'y ('a 'w '2)))  |  (f 'w)
`
;
`
~f \
   'a \ ('b \ ('c .x)  | f ('0 .x)
            \ ('d .x)  | f ('0 'd)
   'a ('b ('e .x) ..   | f ('1 .x ..)
   'z ('1 .y           | ('2)
   'x 'y \ 'z 'w '2    | 'z
           ('a 'w '2   | f 'w
`
})
