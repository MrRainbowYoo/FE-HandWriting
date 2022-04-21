// 手写 Promise.all 函数

Promise._all = function(arr) {
    return new Promise((resolve, reject) => {
        if(Array.isArray(arr)) {
            if(arr.length === 0)
                resolve([])

            let length = arr.length
            let res = []
            let count = 0

            arr.forEach((item, index) => {
                Promise.resolve(item).then(data => {
                    res[index] = data
                    count ++
                    count === length && resolve(res)
                }, reason => {
                    reject(reason)
                })
            })
        } else {
            reject(new TypeError('Argument is not iterable'))
        }
    })
}

// 测试
let p1 = new Promise(resolve => setTimeout(() => { resolve('p1') }, 1000))
let p2 = Promise.resolve('p2')
let p3 = 'just p3'
let p4 = Promise.reject('err,p4')
let p5 = Promise.resolve('p5')

Promise._all([p1, p2, p3, p4, p5]).then(res => {
    console.log(res);
}, err => {
    console.log(err);
})
