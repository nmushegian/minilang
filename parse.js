const ebnf = require('ebnf')

const gram = `
{ ws=implicit }
rule ::= (mold) RSEP (term)
mold ::= "(" vvl ")"
term ::= "(" vvr ")"
var  ::= "." sym
val  ::= "'" sym
vvl  ::= val vvl | var*
vvr  ::= (val | var)*
sym  ::= [a-z0-9] {fragment=true}
RSEP ::= "-+"
WS   ::= " "
`
const parser = new ebnf.Parser(ebnf.Grammars.Custom.getRules(gram), {})
const parse =s=> {
    const ast = parser.getAST(s)
    return ast
}

module.exports = { parse }



