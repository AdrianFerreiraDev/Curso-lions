let a = [1,2,3,4,6,5];
let crescente = false;
let menor = a[0];
let maior = 0;

for (let i = 1; i < a.length; i++) {
    if (i <= (a.length - 2)) {
        maior = a[i + 1];
    } else {
        maior = a[i] + 1;
    }

    if(a[i] > menor && a[i] < maior) {
        crescente = true;
    } else {
        crescente = false;
        break;
    }
}

if(crescente === true) {
    console.log("Crescente");
} else {
    console.log("Não crescente");
}