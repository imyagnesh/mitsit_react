function* abc() {
  try {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    return "completed";
  } catch (error) {
      console.log(error);
  }
}

const gen = abc();

const obj = {a: 1, b: 2}
for (const key in obj) {
    console.log(key);
    console.log(obj[key]);
}

for (const iterator of gen) {
    console.log(iterator);
}


// console.log(gen.next());
// console.log(gen.next());
// gen.return();
// console.log(gen.next());
// console.log(gen.next());
// console.log(gen.next());


const login = () => {
    console.log("login");
}

const logout = () => {
    console.log("logout");
    // api
}

// console.log(logout());

function* auth() {
    yield login();
    yield logout();
}

const authGen = auth();

authGen.next()
authGen.next()

const set = new Set([1,2,3,4,5]);

for (const iterator of set) {
    console.log(iterator);
}

const map = new Map();

map.set("a", { a: 1})
map.set("b", { b: 2})
map.set("c", { c: 3})

for (const [key, value] of map) {
    console.log(key);
    console.log(value);
}
