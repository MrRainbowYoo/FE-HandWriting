// 手写 Function.prototype.call 函数

// 版本一
Function.prototype._call = function(context) {
    // context可能是非对象
    context = context ? Object(context) : window

    const fn = Symbol()
    context[fn] = this

    let args = []
    for(let i = 1; i < arguments.length; i++) {
        args.push(`arguments[${i}]`)
    }

    let res = eval('context[fn](' + args + ')')

    delete context[fn]
    return res
}

// 版本二
Function.prototype._call1 = function() {
    let [context, ...args] = [...arguments]
    context = context ? Object(context) : window
    const fn = Symbol()
    context[fn] = this
    let res = context[fn](...args)
    delete context[fn]
    return res;
}


// 测试
let person = {
    name: '小陈同学吗'
}

var name = 'window name'

function sayHello(...params) {
    console.log('Hello',this.name);
    console.log('传过来的参数是', params);
}

sayHello._call(person, 666)            // 小陈同学吗 [666]
sayHello._call(undefined,1, 2, 3, 4)   // window name [1,2,3,4]
sayHello._call(1, 2, 3, 4)             // undefined [2,3,4]

