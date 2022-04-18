// 手写 instanceof 运算符

const _instanceof = function(left, right) {
    if(!(left && ['object','function'].includes(typeof left)))
        return false;
    
    let prototype = right.prototype
    left = left.__proto__
    while(left) {
        if(left === prototype)
            return true
        left = left.__proto__
    }
    return false
}


// 测试
class Person {
    constructor(name) {
        this.name = name
    }
}
let person = new Person('person')

console.log(_instanceof(person, Person));         // true
console.log(_instanceof(person, Object));         // true
console.log(_instanceof(1, Number));              // false
console.log(_instanceof([], Array));              // true
console.log(_instanceof(null, Object));           // false
console.log(_instanceof(function(){},Function));  // true