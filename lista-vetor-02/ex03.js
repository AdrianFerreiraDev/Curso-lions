let a = [1,2,3,3,3,3,5,8,1,3];
let x = 3;
let contador = 0;

for (let i = 0; i < a.length; i++) {
    if (a[i] === x) {
        contador++;
    }
}

console.log(contador);