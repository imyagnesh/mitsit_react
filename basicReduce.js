

// Reduce methods


// const arr = [1,2,3,4,5];


// let sum = 0;

// for (let i = 0; i < arr.length; i++) {
//     const element = arr[i];
//     sum += element;
// }

// console.log(sum);

// const sum = arr.reduce((previous, current) => {
//     console.log(previous);
//     console.log(current);
//     return previous + current;
// }, 0);

// console.log(sum);

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


  const maleRecords = arr.reduce((p, c) => {
      console.log(p);
     if(c.gender === 'male') {
        return [...p, c] 
     } 
    return  p;
  }, []);

  console.log(maleRecords);



//   const find = arr.reduce((p, c, index) => {
//       if(c.name === 'frohit') {
//           return c;
//       }
//     return p;
//   }, undefined)

//   console.log(find);