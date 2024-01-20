
// 输出 2 1 
setTimeout(function() {
    console.log(1);
}, 0);

console.log(2);

// 输出 3 2 1
setTimeout(function() {
    console.log(1);
}, 0)

Promise.resolve().then(function() {
    console.log(2);
});

console.log(3);

// 输出 5 4 3 1 2
function a() {
    console.log(1);
    Promise.resolve().then(function() {
        console.log(2);
    });
}

setTimeout(function() {
    console.log(3);
    Promise.resolve().then(a);
}, 0);

Promise.resolve().then(function() {
    console.log(4);
});

console.log(5);

// 输出 5 1 2 3
function a() {
    console.log(1);
    Promise.resolve().then(function() {
        console.log(2);
    });
}

setTimeout(function() {
    console.log(3);
}, 0);

Promise.resolve().then(a);

console.log(5);