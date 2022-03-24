const ebnf = require('ebnf')

const gram = `
{ ws=implicit }
rule ::= (term) RSEP (term)
term ::= "(" valvars+ ")"
onlyvars ::= var+
valvars ::= onlyvars+ | vv valvars+
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



