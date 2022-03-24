const ebnf = require('ebnf')

const gram = `
{ ws=implicit }
rule ::= (mold) RSEP (term)
term ::= "(" loosevv* ")"
mold ::= "(" strictvv+ ")"
var  ::= "." sym
val  ::= "'" sym
loosevv ::= vv*
strictvv ::= val strictvv | vv loosevv
vv   ::= var | val


sym  ::= [a-z0-9]
RSEP ::= "-+"
WS   ::= " "
`
const parser = new ebnf.Parser(ebnf.Grammars.Custom.getRules(gram), {})
const parse =s=> {
    const ast = parser.getAST(s)
    return ast
}

module.exports = { parse }



