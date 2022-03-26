const it = require('tapzero').test
const show =(o,d)=> console.dir(o, {depth:d})


const lang = [
  ([a, [b, $c, ...d], ...e]) => [a, b, $c, ...d, ...e]
]

const turn =(lang,term)=> {
    while (true) {
        let next = false;
        for (const rule of lang) {
            try {
                // needs to throw on 'undefined' in destructure
                term = rule(term)
                next = true;
                break;
            } catch (e) {
                //console.log(e)
                continue;
            }
        }
        if (next) continue;
        else break;
    }
    return term
}

it('turn', t=>{
    term = [0, [11, 12, 13], 2]
    show(term)
    show(lang.map(r=>r.toString()))
    show(turn(lang, term))
})
