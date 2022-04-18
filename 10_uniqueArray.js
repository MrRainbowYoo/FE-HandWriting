// 数组去重

let arr = [1, 1, '1', '1', null, null,
    undefined, undefined, , ,
    new String('1'), new String('1'),
    /a/, /a/,
    NaN, NaN
];


// 版本一：Set + 扩展运算符
const uniqueArray1 = function(arr) {
    return [...new Set(arr)]
}
console.log(uniqueArray1(arr));
//  [1, '1', null, undefined, String, String, /a/, /a/, NaN]


// 版本二：indexOf判断
const uniqueArray2 = function(arr) {
    let res = []
    for(let item of arr) {
        if(res.indexOf(item) === -1)
            res.push(item)
    }
    return res
}
console.log(uniqueArray2(arr));
//  [1, '1', null, undefined, String, String, /a/, /a/, NaN, NaN]


// 版本三：filter + indexOf
const uniqueArray3 = function(arr) {
    let res = arr.filter((item, index, array) => {
        return array.indexOf(item) === index
    })
    return res;
}
console.log(uniqueArray3(arr));
//  [1, '1', null, undefined, String, String, /a/, /a/]


// 版本四：Object键值对
const uniqueArray4 = function(arr) {
    let obj = {}
    return arr.filter(item => {
        return obj.hasOwnProperty(typeof item + item) ? false : (obj[typeof item + item] = true)
    })
}
console.log(uniqueArray4(arr));
//  [1, '1', null, undefined, String, /a/, NaN]