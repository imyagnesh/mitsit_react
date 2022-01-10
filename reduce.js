// set
// weakSet 

// map
// weakMap


const arr = [1,2,3,4, -2, -8,5,6];

const set = new Set([1,2,3,4,5,9]);

console.log(set.size);

// O(N)
// O(LogN)


// const arr = [
//     {
//       name: "Yagnesh",
//       age: 30,
//       gender: "male",
//     },
//     {
//       name: "Virat",
//       age: 28,
//       gender: "male",
//     },
//     {
//       name: "Rohit",
//       age: 32,
//       gender: "male",
//     },
//     {
//       name: "Alia",
//       age: 22,
//       gender: "female",
//     },
//     {
//       name: "deepika",
//       age: 26,
//       gender: "female",
//     },
//     {
//         name: 'Taimur',
//         age: 08,
//         gender: 'female'
//     },
//     {
//       name: "priyanka",
//       age: 38,
//       gender: "female",
//     },
//     {
//         name: "Amitabh",
//         age: 68,
//         gender: "male",
//       },
//   ];

//   {
//       "00-09": [],
//       "20-29": [],
//       "30-39": []
//   }

// const age = 23;

// const grp = Math.floor(age / 10);
// console.log(`${grp}0-${grp}9`);


//   const groupByGender = arr.reduce((p, c) => {
//       const age = Math.floor(c.age / 10);
//       const key = `${age}0-${age}9`;
//      (p[key] = p[key] || []).push(c);
//       return p;
//   }, {});

//   console.log(groupByGender);

//   {
//       male: [],
//       female: []
//   }

//   const some = arr.reduce((p, c) => {
//       if(c.age < 18) {
//           return true;
//       }
//     return p;
//   }, false)


//   const every = arr.reduce((p, c) => {
//     if(c.age > 18) {
//         return false;
//     }
//     return p;
//   }, true);


//   const res = arr.every((x) => x.age > 18);

//   console.log(res);

//   console.log(every);


//   const newArr = arr.reduce((p, c) => {
//       if(c.name === 'Rohit') {
//           return [...p, {...c, age: 34}];
//       }
//       return [...p, c]
//   }, []);

//   console.log(newArr);