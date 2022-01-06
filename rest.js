const arr = [1, 2, 3];


// O(1) ->
// O(logN) ->
// O(n)


const obj = {
    a: 1,
    b: 2,
    c: 4
}

const a = 5;

const {c, b, a: objA, ...extra} = obj;

console.log(c);
console.log(extra);

// destructing + spread 
// const { a: objA, b, c, f } = obj

// console.log(a);
// console.log(objA);
// console.log(b);
// console.log(c);
// console.log(f);


// Dot Notation

console.log(obj.c);
console.log(obj.a);
console.log(obj.b);

// Array Notation

const key =  'c'

console.log(obj[key]);


// Immutable
// const copyObj = Object.assign({}, obj, { d: 4 });

// spread operator
const copyObj = { d: 1, ...obj}

console.log(copyObj);

// CRUD
// C -> Create
// R -> Read
// U -> Update
// D -> Delete