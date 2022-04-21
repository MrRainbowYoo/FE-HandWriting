// 手写 Promise.any 函数
// 只要一个成功，就返回

Promise._any = function(arr) {
    return new Promise((resolve, reject) => {
        if(Array.isArray(arr)) {
            if(arr.length === 0)
                reject(new AggregateError('All promises were rejected'))
            
            let length = arr.length
            let errors = []
            let count = 0
            arr.forEach(item => {
                Promise.resolve(item).then(value => {
                    resolve(value)
                }, reason => {
                    count ++
                    errors.push(reason)
                    count === length && reject(new AggregateError('All promises were rejected'))
                })
            })
        } else {
            reject(new TypeError('argument is not iterable'))
        }
    })
}

// 测试
let p1 = new Promise((resolve,reject) => {setTimeout(()=>{reject('p1')}, 1000)})
let p2 = new Promise((resolve,reject) => {setTimeout(()=>{reject('p2')}, 500)})
let p3 = new Promise((resolve,reject) => {setTimeout(()=>{resolve('p3')}, 700)})

Promise.any([p1,p2,p3]).then(res => {
    console.log(res);
})