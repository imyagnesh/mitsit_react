const arr1 = [1, 2, 3, 4, 5];

// Primitive types
console.log(arr1.indexOf(3));

const arr = [
  {
    name: "Yagnesh",
    age: 30,
    gender: "male",
  },
  {
    name: "Virat",
    age: 28,
    gender: "male",
  },
  {
    name: "Rohit",
    age: 32,
    gender: "male",
  },
  {
    name: "Alia",
    age: 22,
    gender: "female",
  },
  {
    name: "deepika",
    age: 26,
    gender: "female",
  },
  {
    name: "priyanka",
    age: 38,
    gender: "female",
  },
];


const array = [10, 8, 4, 12, 4, 3, 9, 7]


// O(logN) best case
let isExist = false;
for (let i = 0; i < array.length; i++) {
    console.log(i);
    if(array[i] === 4) {
        isExist = true;
        break;
    }
}

console.log(isExist);


// O(logN) best case
// O(N) worst case
const index = arr.findIndex((values, index) => {
    console.log(index);
    return values.name === "xyz";
});


// O(logN) best case
// O(N) worst case
const rohit = arr.find((values, index) => {
    console.log(index);
    return values.name === "Rohit";
});

// O(N)
const maleRecords = arr.filter(values => {
    return values.gender === 'other'
})

console.log(maleRecords);

// O(N)
const removeRohit = arr.filter(values => {
    return values.name !== 'Rohit'
})

// O(logN)
const isChildExist = arr.some(value => value.age < 18);

// O(N)
const isEveryAdult = arr.every(x => x.age > 18);

console.log(isEveryAdult);


console.log(isChildExist);

// using map method we can update record

const nums = [1,2,3,4,5];

// O(N)
const nums2 = nums.map(value => {
    return value * 2;
});



console.log(nums2);



console.log(removeRohit);

console.log(rohit);



console.log(index);

const updatedUsers = [
  ...arr.slice(0, index),
  { ...arr[index], age: 34 },
  ...arr.slice(index + 1),
];

console.log(updatedUsers);
