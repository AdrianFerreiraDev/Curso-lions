let numero = [1,2,3,4,5, -293];
let menor = numero[0];

for (let i = 0; i < numero.length; i++) {
    if (numero[i] < menor) {
        menor = numero[i];
    }
}

console.log(menor);
