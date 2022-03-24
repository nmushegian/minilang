const ebnf = require('ebnf')

const gram = `
{ ws=implicit }
rule ::= (mold) RSEP (term)
term ::= "(" loosevv* ")"
mold ::= "(" strictvv+ ")"
loosevv ::= (var | val)*
onlyvars ::= var+
strictvv ::= onlyvars+ | vv strictvv+
vv   ::= var | val
var  ::= "." sym
val  ::= "'" sym
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



