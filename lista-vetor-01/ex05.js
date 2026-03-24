let numero = [12,-22,22,45,798000000];
let maior = numero[0];

for (let i = 0; i < numero.length; i++) {
    if (numero[i] > maior) {
        maior = numero[i];
    }
}

console.log(maior)