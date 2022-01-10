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

// O(N)
const updatedUsers = arr.map(x => {
    if(x.name === 'Rohit') {
        return {...x, age: 34}
    }
    return  x;
});

console.log(updatedUsers);