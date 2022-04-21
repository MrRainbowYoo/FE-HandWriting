// 手写浅拷贝

// 版本一：for...in
const shallowClone1 = function(target) {
    let obj = {}
    for(let key in target) {
        if(target.hasOwnProperty(key))
            obj[key] = target[key]
    }
    return obj
}

// 版本二：Object.assign
const shallowClone2 = function(target) {
    return Object.assign({}, target)
}

// 版本三：扩展运算符
const shallowClone3 = function(target) {
    return {...target}
}

// 测试
let target = {
    name: '小陈同学吗',
    habbits: ['coding', 'game', 'study'],
    test: {
        a: {
            b: 0
        }
    }
}

let obj1 = shallowClone1(target)
let obj2 = shallowClone2(target)
let obj3 = shallowClone3(target)

target.name = '123456'
target.habbits.pop()
target.test.a.b = 11111
console.log(obj1.name, obj2.habbits, obj3.test.a.b);  // 小陈同学吗 [ 'coding', 'game' ] 11111
