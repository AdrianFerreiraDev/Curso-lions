let a = [1,2,3,4,5];
let b = [];
let c = 0;

for (let i = a.length-1; i >= 0; i--) {
    b[c] = a[i];
    c++
}

console.log(b)