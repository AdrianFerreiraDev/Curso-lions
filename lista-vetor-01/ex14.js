let a = [1, 2, 3, 4, 5, 6, 7, 8, "x", "x"];
let primeira = -1;

for (let i = 0; i < a.length; i++) {
        if (a[i] === "x") {
            primeira = i;
            break;
        }
}

console.log(primeira)