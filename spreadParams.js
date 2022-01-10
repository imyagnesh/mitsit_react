

function add(a, b, ...x) {
    console.log(a);
    console.log(b);
    console.log(x);
    let sum = 0;
    for (let i = 0; i < x.length; i++) {
        sum += x[i]
    }
    return sum;
}

console.log(add(1, 2, 3, 4));