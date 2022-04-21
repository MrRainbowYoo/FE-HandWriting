// 手写 Promise.race 函数

Promise._race = function(arr) {
    return new Promise((resolve, reject) => {
        if(Array.isArray(arr)) {
            // 如果是空的，一直等待
            if(arr.length > 0) {
                arr.forEach(item => {
                    Promise.resolve(item).then(resolve, reject)
                })
            }
        } else {
            reject(new TypeError('argument is not iterable'))
        }
    })
}

// 测试
let p1 = new Promise((resolve,reject) => {setTimeout(()=>{resolve('p1')}, 1000)})
let p2 = new Promise((resolve,reject) => {setTimeout(()=>{resolve('p2')}, 500)})
let p3 = new Promise((resolve,reject) => {setTimeout(()=>{resolve('p3')}, 700)})

Promise._race([p1, p2, p3]).then(res => {
    console.log(res);
})