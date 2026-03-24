let a = [1, 2, 3, 4, 5, 6, 7, 8, "x"];
let primeira = 0;

for (let i = 0; i < a.length; i++) {
    if (primeira === 0) {
        if (a[i] === "x") {
            console.log(i);
            primeira++;
        }
    }
}

if (primeira === 0) {
    console.log("-1");
}