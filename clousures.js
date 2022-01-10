

// const calc = (a, b, operator) => {
//     if(operator === '+') {
//         return a + b;
//     }
//     if(operator === '-') {
//         return a - b;
//     }
// }

const div = (a, b) => a / b;

const add = (a, b) => a + b;

const sub = (a, b) => a - b;

const mul = (a, b) => a * b;

const calc = (a, b) => {
    return (operator) => {
        return operator(a, b);
    }
}

console.log(add(1, 2));

console.log(calc(1,2)(add));
console.log(calc(5,6)(mul));

console.log(calc(5, 6)(div));
