// 手写 Promise.reject 方法

Promise._reject = function(reason) {
    return new Promise((resolve, reject) => {
        reject(reason)
    })
}


// 测试
Promise._reject('error').then(value => console.log(value), reason => console.log(reason))  // error