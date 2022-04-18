// 手写 Function.prototype.bind 方法

Function.prototype._bind = function(context) {
    const self = this
    const args = Array.prototype.slice.call(arguments, 1)

    let fBlank = function() {}

    let fBound = function() {
        const bindArgs = Array.prototype.slice.call(arguments)
        // 当作为构造函数new使用的时候，this会指向实例
        // 当作为普通函数的时候，this会指向window，结果为false，因此绑定函数this为context
        return self.apply(this instanceof fBlank ? this : context, args.concat(bindArgs))
    }

    // 修改返回函数的prototype为绑定函数的prototype，实例就可以继承绑定函数中原型的值
    fBlank.prototype = self.prototype
    fBound.prototype = new fBlank()
    return fBound
}


// 测试
let foo = {
    name: 'foo'
}

function sayName(){
    console.log(this.name);
}

function Person(name, age) {
    this.name = name
    this.age = age
}
// 构造函数调用_bind
let bindFoo = Person._bind(foo, '小陈同学吗')
let person = new bindFoo(18)
console.log(person);         // 小陈同学吗

// 普通函数调用_bind
let say = sayName._bind(foo)
say()                             // foo