let a = [1,2,3,4,5];
let b = a;

for (let i = 0; i < a.length; i++) {
    b[i] = a[i]*2;
}

console.log(b)