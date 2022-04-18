// 手写 Function.prototype.apply 方法

Function.prototype._apply = function(context) {
    // context可能是非对象
    context = context ? Object(context) : window

    const fn = Symbol()
    context[fn] = this

    let res;
    if(arguments[1]) {
        res = context[fn](...arguments[1])
    } else {
        res = context[fn]()
    }

    delete context[fn]
    return res;
}

// 测试
let person = {
    name: '小陈同学吗'
}

var name = 'window name'

function sayHello(...params) {
    console.log(this.name);
    console.log(params);
}

sayHello._apply(person, [1, 2, 3, 4])   // 小陈同学吗 [1,2,3,4]
sayHello._apply(null, [1, 2])           // window name [1, 2]
sayHello._apply(person)                 // 小陈同学吗 []