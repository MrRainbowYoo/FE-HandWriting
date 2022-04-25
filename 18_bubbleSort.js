// 手写冒泡排序
/**
 * 1. 从第一个元素开始，比较相邻的元素，若前者大则交换顺序（升序）
 * 2. 每一轮都能选出一个最大的冒泡到数组末尾
 */

const bubbleSort = function(arr) {
    let length = arr.length

    for(let i = 0; i < length - 1; i++) {
        for(let j = 0; j < length - 1 - i; j++) {
            if(arr[j] > arr[j+1]) {
                let temp = arr[j]
                arr[j] = arr[j+1]
                arr[j+1] = temp
            }
        }
    }
    return arr
}


// 测试
let arr = [-2, -4, 2, 12, 11, 24, 13, 88, 6, 6, 6, 0]
console.log(bubbleSort(arr));