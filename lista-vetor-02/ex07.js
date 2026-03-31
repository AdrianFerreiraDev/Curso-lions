let a = [1,4,2,6,7,3,5];
let par = [];
let impar = [];
let b = 0;
let c = 0;

for (let i = 0; i < a.length; i++) {
    if(a[i] % 2 === 0) {
        par[b] = a[i];
        b++;
    } else {
        impar[c] = a[i];
        c++
    }
    
}

console.log("Par: " + par + "\nImpar: " + impar)