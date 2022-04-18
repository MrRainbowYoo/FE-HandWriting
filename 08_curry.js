// 手写柯里化函数
// 功能：参数复用、延迟计算、动态生成函数

const curry = function(fn) {
    let args = Array.prototype.slice.call(arguments, 1)
    const length = fn.length

    if(args.length === length) {
        return fn.apply(null, args)
    }

    return function() {
        const params = args.concat([].slice.call(arguments))
        if(params.length < length) {
            return curry(fn, ...params)
        } else {
            return fn.apply(null, params)
        }
    }
}

// 测试
const fn = function(a, b, c, d, e) {
    console.log(a, b, c, d, e);
}
const print = curry(fn,1,2)
print(3)()(4)()()(5)