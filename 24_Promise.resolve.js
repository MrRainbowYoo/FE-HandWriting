// 手写 Promise.resolve 方法

Promise._resolve = function(value) {
    // 若参数为Promise实例，则直接返回 
    if(value instanceof Promise)
        return value
    // 若参数是一个thenable对象，返回这个对象的最终状态
    else if(value instanceof Object && 'then' in value)
        return new Promise((resolve, reject) => {
            value.then(resolve, reject)
        })
    // 否则返回的promise将以此值完成
    return new Promise(resolve => resolve(value))
}


// 测试
const thenableObj = { 
    then: function(resolve) {
        return resolve('thenable')
    } 
}
const p1 = Promise._resolve(1)
const p2 = Promise._resolve(new Promise(resolve => resolve(123)))
const p3 = Promise._resolve(thenableObj).then(res => console.log(res))

console.log(p1, p2, p3);  // Promise { 1 } Promise { 123 } Promise { <pending> }  thenable
