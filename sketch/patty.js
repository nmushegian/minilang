
function patty([a, b]) {
    const src = patty.toString()
    const pattern = src.slice(src.indexOf('(')+1, src.indexOf(')'))
    return {
        pattern, match: patty
    }
}

console.dir(patty([0, 1]), {depth:null})

