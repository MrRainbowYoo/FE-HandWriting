// 手写 Promise.allSettled 函数

Promise._allSettled = function(arr) {
    return new Promise((resolve, reject) => {
        if(Array.isArray(arr)) {
            if(arr.length === 0)
                resolve([])
            
            let res = []
            let count = 0
            let length = arr.length

            arr.forEach((item, index) => {
                Promise.resolve(item).then(value => {
                    count ++
                    res[index] = {
                        status: 'fulfilled',
                        value
                    }
                    count === length && resolve(res)
                }, reason => {
                    count ++
                    res[index] = {
                        status: 'rejecte',
                        reason
                    }
                    count === length && resolve(res)
                })
            })
        } else {
            reject(new TypeError('argument is not iterable'))
        }
    })
}

// 测试
let p1 = new Promise(resolve => setTimeout(() => { resolve('p1') }, 1000))
let p2 = Promise.resolve('p2')
let p3 = 'just p3'
let p4 = Promise.reject('err,p4')
let p5 = Promise.resolve('p5')

Promise._allSettled([p1, p2, p3, p4, p5]).then(res => {
    console.log(res);
})