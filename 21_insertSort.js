// 手写插入排序
/**
 * 核心思想：将一个数插入一个已经排好序的序列中
 * 1. 假设数组第一个元素已经是一个有序序列，从第二个元素开始往前判断
 */

const insertSort = function(arr) {
    for(let i = 1; i < arr.length; i++) {
        let j = i - 1
        let curValue = arr[i]

        while(j >= 0 && arr[j] > curValue) {
            arr[j+1] = arr[j]
            j--
        }
        arr[j+1] = curValue
    }
    return arr
}


// 测试
let arr = [-2, -4, 2, 12, 11, 24, 13, 88, 6, 6, 6, 0]
console.log(insertSort(arr));