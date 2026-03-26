let a = [1,2,3,4,5,6,7,8,9,10];
let maior = a[0];
let maior2 = a[0];

for(let i = 0; i < a.length; i++) {
    if(a[i] > maior) {
        maior = a[i];
    }
};
for(let i = 0; i < a.length; i++) {
    if(a[i] > maior2 && a[i] < maior) {
        maior2 = a[i];
    }
};

console.log("maior", maior, "segundo maior", maior2)