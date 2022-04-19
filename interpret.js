const test = require('tapzero').test
const { read } = require('./parse')

const code0 = `- [Car [Cons x y]] + x`
const term0 = `[Car [Cons 0 1]]`

const checksymb =s=> (typeof(s) == 'string' && s.length > 0)
const checktope =s=> checksymb(s) && s[0].isUpperCase()
const checkvar  =s=> checksymb(s) && s[0].isLowerCase()
const checklist =s=> (l instanceof Array)

const turn =(book,term)=> {
    
}

test('turn', t=>{
    t.equal(turn(book0, term0), "0")
})

