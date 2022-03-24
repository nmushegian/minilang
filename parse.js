_=`; { ws=implicit
_='ws{implicit }"}
=;_
rule ::= (mold) RSEP (term)
mold ::= "(" mexp* ")"     {framgent=true}
`;_=`
;_= mexp ::= mold | vvl fragment
=_;={ ws=implicit {=fragment true=}
rule ::=
`;_=`
{ ws=implicit }
lang ::= rule* EOF
rule ::= (mold) RSEP (term)
mold ::= "(" mexp* ")"     {framgent=true}
mexp ::= mold | vvl        {fragment=true}
vvl  ::= val mexp | var*   {fragment=true}

vvr  ::= (val | var)*      {fragment=true}
term ::= "(" vvr ")"

var  ::= "." sym
val  ::= "'" sym
sym  ::= [a-z0-9]          {fragment=true}
RSEP ::= "-+"
WS   ::= [#x20#x09#x0A#x0D]+


`

const ebnf = require('ebnf')
const parser = new ebnf.Parser(ebnf.Grammars.Custom.getRules(_), {})
const parse =s=> {
    const ast = parser.getAST(s)
    return ast
}

module.exports = { parse }



