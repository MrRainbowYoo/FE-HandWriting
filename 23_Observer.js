// 手写观察者模式

class Subject {
    constructor() {
        this.subs = []
    }

    addSub(ob) {
        this.subs.push(ob)
    }

    remove(ob) {
        let index = this.subs.indexOf(ob)
        if(index >= 0)
            this.subs.splice(index, 1)
    }

    notify() {
        this.subs.forEach(ob => ob.update())
    }
}

class Observer {
    constructor(name) {
        this.name = name
    }

    update() {
        console.log(`${this.name}已经收到通知`);
    }
}

const observer1 = new Observer('观察者一号')
const observer2 = new Observer('观察者二号')
const subject = new Subject()
subject.addSub(observer1)
subject.addSub(observer2)
subject.notify()  // 观察者一号已经收到通知 观察者二号已经收到通知

subject.remove(observer1)
subject.notify()  // 观察者二号已经收到通知