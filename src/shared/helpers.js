export function randomPair(n) {
    let sample = [];
    let range = [];
    for(let i=0; i<n; i++) {
        range.push(i);
    }
    for(let i=0; i<2; i++) {
        sample.push(range.splice(Math.random()*range.length,1)[0]);
    }

    return sample;
}

export function randomFromRange(range) {
    return range.splice(Math.random()*range.length,1)[0];
}