


const arr = [...Array(10000000).keys()]

console.time('for')
for (let i = 0; i < arr.length; i++) {
}
console.timeEnd('for')

console.time('forEach')
arr.forEach(element => {
});
console.timeEnd('forEach')

console.time('while')
let j = 0
while (j < arr.length) {
    j++;
}
console.timeEnd('while')

console.time('doWhile')
let k = 0;
do {
    k++;
} while (k < arr.length);
console.timeEnd('doWhile')

// ForOf
// ForIn







// for
// foreach -> fastest 1 -> slowest
// while
// do while -> fastest 1

// for (let i = 0; i < arr.length; i++) {
//     const element = arr[i];
//     console.log(element);
// }