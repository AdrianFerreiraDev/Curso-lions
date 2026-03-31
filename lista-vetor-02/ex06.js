let a = [1,2,3];
let b = [10,20,30];
let c = [];
let d = 0;

for (let i = 0; i < a.length; i++) {
    c[d] = a[i];
    d++;
    c[d] = b[i];
    d++
}

console.log(c);