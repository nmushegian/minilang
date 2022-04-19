const test = require('tapzero').test
const { read } = require('./parse')

const code0 = `- [Car [Cons x y]] + x`
const term0 = `[Car [Cons 0 1]]`

const turn =(book,term)=> {
}

test('turn', t=>{
    t.equal(turn(book0, term0), "0")
})

