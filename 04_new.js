// 手写 new 运算符

const _new = function(constructor, ...args) {
    const obj = Object.create(constructor.prototype)
    const res = constructor.apply(obj, args)
    // 判断res是否为null，若为null则返回实例对象
    return res instanceof Object ? res || obj : obj
}


// 测试
function Person(name, age) {
    this.name = name
    this.age = age
    return null
}
Person.prototype.sayName = function() {
    console.log(this.name);
}
let person1 = _new(Person, 'person1', 1)
person1.sayName()           // person1


function Game(status) {
    this.status = status
    return {
        name: 'another object'
    }
}
let game1 = _new(Game, 'success')
console.log(game1);         // {name:'another object'}