// 手写深拷贝

// 版本一：JSON.parse + JSON.stringfy
// 局限性：
// 1. undefined、Symbol、function会丢失
// 2. 正则会变成空对象{}
// 3. Date会转换为字符串类型
// 4. 无法解决循环引用
const deepClone1 = function(target) {
    return JSON.parse(JSON.stringify(target))
}



// 版本二：递归实现 + 考虑多种数据类型 + 解决循环引用
const deepClone2 = function(target, weakMap = new WeakMap()) {
    if(target == null)  return target;
    if(target instanceof Date) return new Date(target);
    if(target instanceof RegExp) return new RegExp(target);
    if(typeof target !== 'object')  return target;

    if(weakMap.has(target)) return weakMap.get(target)

    let copyTarget = Array.isArray(target) ? [] : {}
    weakMap.set(target, copyTarget)

    for(let key in target) {
        if(target.hasOwnProperty(key)) {
            copyTarget[key] = deepClone2(target[key], weakMap)
        }
    }

    return copyTarget
}


// 测试
let target = {
    name: '小陈同学吗',
    habbits: ['coding', 'game', 'study'],
    age: undefined,
    testObj: null,
    fn: function(){},
    sym: Symbol(1),
    reg: RegExp(),
    date: Date(),
}

target.target = target
// let obj1 = deepClone1(target)
let obj2 = deepClone2(target)
console.log(obj2);