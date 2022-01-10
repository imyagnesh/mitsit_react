

// OOPS

// Encapsulation -> 

// Abstraction => 

// Inheritance -> 

// Polymorphysm -> 



class Employee {
    // special method
    // call only once

    isPermanent = true;


    constructor(firstName, lastName) {
        console.log(firstName);
        console.log(lastName);
        this.firstName = firstName;
        this.lastName = lastName;
    }

    set firstName(value) {
        this.abc = Employee.capitalize(value);
    }

    get firstName() {
        return this.abc
    }

    static capitalize(str) {
        return `${str[0].toUpperCase()}${str.slice(1)}`
    }

    getInfo() {
        console.log(this.firstName);
        console.log(this.lastName);
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            isPermanent: this.isPermanent
        }
    }

    makeContractor() {
        this.isPermanent = false;
    }

    changeFirstName(name) {
        this.firstName = name;
    }
}

console.log(Employee.capitalize('abc'));

const e = new Employee('yagnesh', 'modh');
e.makeContractor()
// e.changeFirstName('yag')

console.log(e.getInfo()); 

const v = new Employee("Virat", 'Kohli');
console.log(v.getInfo()); 