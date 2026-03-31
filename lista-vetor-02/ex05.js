let a = [1,2,3,4];
let b = [0];
let c = 1;

for(let i = 0; i < a.length; i++) {
    if(i === a.length - 1) {
        c = 0;
    } 
    b[c] = a[i];
    c++
}

console.log(b)