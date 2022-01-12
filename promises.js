// async programing

// 1. callback
// 2. promises
// 3. generators



// 1. pending
// 2. fullFilled
// 3. rejected

const login = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("login token")
        }, 1000)
    })
}

const userData = (token) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(!token) {
                reject("token is not available")
            }
            resolve({ name: 'yagnesh', age: 30});
        }, 2000)
    })
}

const leftSec = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject("fetch left section rejected")
        }, 100)
    })
}

const mainSec = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject("fetch main section reject")
        }, 150)
    })
}

const rightSec = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject("fetch right section reject")
        }, 200)
    })
}


// Old javascript appoch
login()
.then((val) => {
    console.log(val);
    userData(val)
    .then(user => {
        console.log(user);
    })
    .catch(err => {
        console.log(err);
    })
})
.catch((err) => {
    console.log(err);
})


const fetchData = async () => {
    try {
        console.time("promise");
        // const ls = await leftSec();
        // const ms = await mainSec();
        // const rs = await rightSec();
        const res = await Promise.any([
            leftSec(),
            mainSec(),
            rightSec()
        ])
        console.log(res);
        console.timeEnd("promise");
    } catch (error) {
        console.log(error);
    }
}

console.log(fetchData());


