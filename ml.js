const it = require('tapzero').test
const toss =s=> { throw new Error(s) }
const need =(b,s)=> b ?? toss(s)
const log = console.log

const rule0 = ['RULE', ['if', '0', '.a', '.b'], '.a']
const rule1 = ['RULE', ['if', '1', '.a', '.b'], '.b']

const lang = [rule0, rule1]

const term = ['if', '0', 'ali', 'bob']


const isval =s=> (typeof(s) == 'string' && s[0] != '.')
const isvar =s=> (typeof(s) == 'string' && s[0] == '.')
const islist =l=> l instanceof Array

const match =(patt,term,onlyvars)=> {
    if (patt.length == 0) {
        return {}
    }
    need(term.length > 0, `match fail: term is empty but pattern is ${patt}`)
    const p0 = patt[0]
    const t0 = term[0]
    const prest = patt.slice(1)
    const trest = term.slice(1)
    if (isval(p0)) {
        need(isval(t0), `match fail: ${p0} is a val but ${t0} is not`)
        need(!onlyvars, `match fail: ${p0} is a val in only-vars tail`)
        return match(prest, trest, onlyvars)
    }
    if (isvar(p0)) {
        const bindings = match(prest, trest, true)
        need(!(p0 in bindings), `match fail: duplicate var name in pattern`)
        const binding = { [p0]: t0, ...bindings}
        return binding
    }
    if (islist(p0)) {
        need(islist(t0), `match fail: pattern ${p0} is a list but ${t0} is not`)
        const subbind = match(p0, t0, false)
        const restbind = match(prest, trest, onlyvars)
        for (let k in subbind) {
            need(!(k in restbind), `match fail: duplicate var name in pattern`)
        }
        const binding = { ...subbind, ...restbind }
        return binding
    }
    toss(`match panic: unreachable`)
}

const subst =(binds,plate)=> {
    if (isval(plate)) {
        return plate
    }
    if (isvar(plate)) {
        if (plate in binds) {
            return binds[plate]
        }
    }
    return plate.map(x=>subst(binds, x))
}

const appr =(rule,term)=> {
    need(rule[0] == 'RULE', `panic: appr(r,_) is not a rule: ${rule}`)
    const binds = match(rule[1], term)
    const rewrite = subst(binds, rule[2])
    return rewrite
}

it('isval isvar islist', t=>{
    t.ok(isval('if'))
    t.ok( ! isval('.if'))
    t.ok(isvar('.if'))
    t.ok( ! isvar('if'))
    t.ok(islist([]))
})

it('match', t=>{
    const bind = match(rule0[1], term)
    t.ok(bind)
    t.equal(bind['.a'], 'ali')
    t.equal(bind['.b'], 'bob')
})

it('subs', t=>{
    const bind = match(rule0[1], term)
    const rewrite = subst(bind, rule0[2])
    t.ok(rewrite)
    t.equal(rewrite, 'ali')
})

it('appr', t=>{
    const nterm = appr(rule0, term)
    t.ok(nterm)
    t.equal(nterm, 'ali')
})
