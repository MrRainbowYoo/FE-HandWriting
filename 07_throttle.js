// 手写节流函数
// 适用场景：scroll滚动事件、input输入框特定时间发送请求

/**
 * 版本一：时间戳版本 【该版本会立即执行一次函数】
 * 预先定义previous为0，触发事件的时候，取当前时间戳为now，
 * 若now - previouse > delay，执行函数，更新previouse时间戳。
 */
const throttle1 = function(fn, delay) {
    let previous = 0

    return function() {
        const context = this
        const args = arguments
        let now = +new Date()
        if(now - previous > delay) {
            fn.apply(context, args)
            previous = +new Date()
        }
    }
}

/**
 * 版本二：定时器版本 【该版本停止触发事件后会再执行一次函数】
 * 触发事件的时候，定义一个定时器。
 * 再次触发事件的时候，若定时器存在，则不执行，直到定时器到期，执行函数，清除定时器
 */
const throttle2 = function(fn, delay) {
    let timeout

    return function() {
        const context = this
        const args = arguments

        if(!timeout) {
            timeout = setTimeout(() => {
                fn.apply(context, args)
                timeout = null
            }, delay);
        }
    }
}

/**
 * 版本三：时间戳 + 定时器 【该版本有头有尾，立即执行 + 末尾执行】
 */
const throttle3 = function(fn, delay) {
    let timeout
    let previous = 0

    const later = function() {
        previous = +new Date()
        timeout = null
        fn.apply(context, args)
    }

    return function() {
        const context = this
        const args = arguments

        let now = +new Date()
        let remain = delay - (now - previous)
        // 若剩余时间没了 或 修改了系统时间
        if(remain <= 0 || remain > wait) {
            if(timeout) {
                clearTimeout(timeout)
                timeout = null
            }
            previous = +new Date()
            fn.apply(context, args)
        }else if(!timeout){
            timeout = setTimeout(later, remain)
        }
    }
}