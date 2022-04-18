// 手写 Array.prototype.flat 方法

// 版本一：递归实现
const _flat1 = function(arr) {
    let res = []
    for(let item of arr) {
        if(Array.isArray(item)) {
            res = res.concat(_flat1(item))
        } else {
            res.push(item)
        }
    }
    return res;
}

// 版本二：reduce + 递归实现
const _flat2 = function(arr) {
    return arr.reduce((pre,cur) => {
        return pre.concat(Array.isArray(cur) ? _flat2(cur) : cur)
    },[])
}

// 版本三：while循环 + 扩展运算符
const _flat3 = function(arr) {
    while(arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr)
    }
    return arr
}

// 版本四：可指定摊开次数，这里我用reduce+递归实现
const _flatDeep = function(arr, dim = 1) {
    return dim > 0 ? arr.reduce((pre, cur) => {
        return pre.concat(Array.isArray(cur) ? _flatDeep(cur, dim - 1) : cur)
    },[]) : arr.slice()
}

// 测试
let arr = [1, 2, [3, [4, 5, [6, 7, 8]]]]
console.log(_flat1(arr));              // [1, 2, 3, 4, 5, 6, 7, 8]
console.log(_flat2(arr));              // [1, 2, 3, 4, 5, 6, 7, 8]
console.log(_flat3(arr));              // [1, 2, 3, 4, 5, 6, 7, 8]
console.log(_flatDeep(arr, 2));        // [ 1, 2, 3, 4, 5, [ 6, 7, 8 ] ]
console.log(_flatDeep(arr, Infinity)); // [1, 2, 3, 4, 5, 6, 7, 8]