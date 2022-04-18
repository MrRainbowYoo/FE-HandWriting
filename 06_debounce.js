// 手写防抖函数
// 适用场景：浏览器频繁resize、按钮多次点击、文本编辑器实时保存、搜索栏实时搜索

// 版本一：不会立即执行
const debounce1 = function(fn, delay) {
    let timeout

    return function() {
        // context解决fn中this错误指向的问题（正确：绑定事件的元素，错误：window）
        const context = this
        // args解决fn中若有参数e，即event事件对象，防抖后获取不到的问题
        const args = arguments

        if(timeout) clearTimeout(timeout)

        timeout = setTimeout(() => {
            fn.apply(context, args)
        }, delay);
    }
}

// 版本二：可设置立即执行
const debounce2 = function(fn, delay, immediate) {
    let timeout, result

    return function() {
        const context = this
        const args = arguments

        if(timeout) clearTimeout(timeout)

        // 若立即执行
        if(immediate) {
            // 若执行过，不再执行
            let callNow = !timeout
            timeout = setTimeout(() => {
                timeout = null
            }, delay);
            if(callNow) {
                result = fn.apply(context, args)
            }
        } else {
            timeout = setTimeout(() => {
                fn.apply(context, args)
            }, delay);
        }
        return result;
    }
}

// 使用
xxx.addEventListener('xxxxx', debounce1(fn, 1000))