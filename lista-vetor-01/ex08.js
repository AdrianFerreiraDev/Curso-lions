let numero = [1,2,3,4,5,6,7,8];
let pares = 0;

for (let i = 0; i < numero.length; i++) {
    if (numero[i] % 2 === 0) {
        pares = pares + numero[i];
    }
}


console.log(pares);