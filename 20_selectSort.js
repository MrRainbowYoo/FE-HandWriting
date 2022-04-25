// 手写选择排序
/**
 * 1. 从第一个元素开始，记录下标，往后遍历，遇到比它大的，则记录下标
 * 2. 一轮结束后，判断下标是否还是第一个，否则交换两个元素。
 */

const selectSort = function(arr) {
    for(let i = 0; i < arr.length; i++) {
        let minIndex = i
        for(let j = i+1; j < arr.length; j++) {
            if(arr[j] < arr[minIndex]) {
                minIndex = j
            }
        }
        if(minIndex != i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
        }
    }
    return arr
}


// 测试
let arr = [-2, -4, 2, 12, 11, 24, 13, 88, 6, 6, 6, 0]
console.log(selectSort(arr));