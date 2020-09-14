let o1 = {a: 1, b: 2}
let o2 = {}

let o3 = Object.assign(o1, o2)
o3.a = 10;
console.log(o1)
console.log(o2)
console.log(o3)