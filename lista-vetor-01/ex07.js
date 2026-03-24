let numero = [1,2,3,4,5,6,7,17471367864615796546151687354176531869734];
let pares = 0;

for (let i = 0; i < numero.length; i++) {
    if (numero[i] % 2 === 0) {
        pares++;
    }
}


console.log(pares);