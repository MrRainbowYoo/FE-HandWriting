// 手写发布订阅模式

class EventEmitter {
    constructor() {
        this.events = {}
    }

    on(event, fn) {
        if(this.events[event])
            this.events[event].push(fn)
        else
            this.events[event] = [fn]
    }

    off(event, fn) {
        let tasks = this.events[event]
        if(tasks) {
            const index = tasks.findIndex(f => f === fn || f.callback === fn)
            if(index >= 0)
                tasks.splice(index, 1)
        }
    }

    // 可设置once
    emit(event, once = false, ...args) {
        if(this.events[event]) {
            // 创建副本，若回调函数内继续注册相同事件，会造成死循环
            let tasks = this.events[event].slice()
            for(let fn of tasks)
                fn(...args)
            if(once) {
                delete this.events[event]
            }
        }
    }

    once(event, fn) {
        const that = this
        const proxyCallback = function() {
            fn()
            that.off(event, proxyCallback)
        }
        this.on(event, proxyCallback)
    }
}


// 测试
const eventBus = new EventEmitter()
const fn1 = function(name, age) {
    console.log(`${name} is ${age} years old.`);
}
const fn2 = function(name) {
    console.log(`Hello ${name}`);
}

eventBus.on('click', fn1)
eventBus.on('click', fn2)
eventBus.emit('click', false, '小陈', 18)  // 小陈 is 18 years old. Hello 小陈
eventBus.emit('click', true, 'Jack', 11)  // Jack is 11 years old. Hello Jack
eventBus.emit('click', false, 'Jack', 11) // 无输出

eventBus.on('test', fn2)
eventBus.emit('test', false, 123, 456)
eventBus.off('test',fn2)

eventBus.once('xxx', fn2)
eventBus.emit('xxx', 123)
