let a = [1,2,3,4];
let b = [];
let c = 0;

for (let i = 0; i < a.length - 1; i++) {
        b[c] = a[i] + a[i + 1];
        c++;
}

console.log(b);