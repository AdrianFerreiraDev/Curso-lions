let numero = [1, 2, 3, 4, 5, 15, 18357, 11];
let maiores = 0;

for (let i = 0; i < numero.length; i++) {
    if (numero[i] > 10) {
        maiores++;
    };
}

console.log(maiores);