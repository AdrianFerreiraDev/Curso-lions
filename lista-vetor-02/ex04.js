let a = [1,2,3,2,1];
let b = [];
let c = 0;
let p = true;

for (let i = a.length - 1; i >= 0; i--) {
    b[c] = a[i];
    c++;
};

for (let i = 0; i < a.length; i++) {
    if(a[i] !== b[i]) {
        p = false;
    }
}

if(p === true) {
    console.log("Palídromo");
} else {
    console.log("Não");
}