
// console.log(user.age);
// console.log(user.gender);
// console.log(user.name);

const name = 'yagnesh';
const age = 30;
const gender = 'male';

const user = {
    firstName: 'Yagnesh',
    lastName: 'Modh',
    age,
    gender,
    fullName() {
        return `${this.firstName} ${this.lastName}`
    }
}

console.log(user.age);
console.log(user.gender);

console.log(user.fullName());

