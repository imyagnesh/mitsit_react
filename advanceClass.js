const user = {
    firstName: 'Yagnesh',
    lastName: "Modh",
    age: 30,
    fullName() {
        return `${this.firstName} ${this.lastName}`
    }
}

console.log(user.firstName);
console.log(user.lastName);



const user1 = {
    firstName: 'Virat',
    lastName: "Kohli",
    age: 28,
    fullName() {
        return `${this.firstName} ${this.lastName}`
    }
}


console.log(user1.firstName);
console.log(user1.lastName);

// Public
// Protected -> Not available
// Private



class Employee {

    isPermanent = false;
    // call only Once
    // special method
    constructor (firstName, lastName, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        // this.timer = this.timer.bind(this);
    }

    set firstName(val) {
        this._firstName = Employee.capitalize(val);
    }

    get firstName() {
        return this._firstName;
    }

    set lastName(val) {
        this._lastName = Employee.capitalize(val);
    }

    get lastName() {
        return this._lastName;
    }

    static capitalize(str) {
        return `${str[0].toUpperCase()}${str.slice(1)}`
    }

    timer = () => {
        console.log(this.firstName);
    }

    fullName = () => {
        setTimeout(this.timer, 0)
        

        return `${this.firstName} ${this.lastName}`
    }

    workingHours() {
        const salary = this.#reviewIncome();
        if(salary >= 1000) {
            return 8;
        }
        return 6;
    }

    #reviewIncome() {
        return 1000;
    }
}

class CEO extends Employee {
    isPermanent = true;

    constructor () {
        super('Yag', 'Modh', 30)
    }

    checkIncome() {
        const hrs = super.workingHours();
        console.log(hrs);
        return 'current months income is $10000'
    }

    workingHours() {
        const hrs = super.workingHours();
        console.log(this.isPermanent);
        return hrs + 6
    }
    
}

console.log(Employee.capitalize("hello"));

const u1 = new Employee("yagnesh", "modh", 30)
const u2 = new Employee("virat", "kohli", 28)

console.log(u1.firstName);
console.log(u1.lastName);
// console.log(u1.#reviewIncome());
console.log(u1.fullName());

const ceo = new CEO();
console.log(ceo.fullName());
console.log(ceo.checkIncome());
console.log(ceo.workingHours());



