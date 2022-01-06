

// Mutable vs Immutable

// traversing takes max time 

const obj = {
    a: 1,
    b: 2,
    c: 3
}

const newObj = Object.assign({}, obj, { c: 5});

console.log(newObj);

// 1000

// obj.d = 5;

// console.log(obj);



const nestedObj = {
    a: 1,
    b: 2,
    c: {
        d: 4,
        e: {
            f: 5,
            g: {
                h: 6
            }
        }
    }
}

const newNestedObj = Object.assign({}, nestedObj, {c: {
    d: 4,
    e: {
        f: 5,
        g: {
            h: 10
        }
    }
}});

console.log(JSON.stringify(newNestedObj));
// obj.c.e.g.h = 10

// console.log(obj.c.e.g.h);

// console.log(JSON.stringify(obj));

// fetch user info from server;

const user = {
    name: 'yagnesh',
    age: 30,
    gender: 'male'
}

const copyUser = Object.assign({}, user, { name: 'Hello Yagnesh'})

console.log(copyUser.name);

console.log(user.name);