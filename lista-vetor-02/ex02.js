let a = [2,2,5,7,5];
let b = [];
let repetido = false;

for(let i = 0; i < a.length; i++) {
    repetido = false;
    for(let c = 0; c < a.length; c++) {
        if(a[i] === b[c]) {
            repetido = true;
        }
    }
    if(!repetido) {
        b[b.length] = a[i];
    }
}

console.log(b)