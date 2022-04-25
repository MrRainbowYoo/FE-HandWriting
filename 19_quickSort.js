// 手写快排
/**
 * 1. 在数组中选取一个元素作为基准（pivot）
 * 2. 所有小于基准的数字，都移动到基准的左边；大于基准的数字移动到右边
 * 3. 对基准左右两边的子集，重复1操作，直到所有子集剩下一个元素
 */

const quickSort = function(arr) {
    if(arr.length <= 1)
        return arr;
    
    let pivotIndex = Math.floor(arr.length / 2)
    let pivot = arr.splice(pivotIndex, 1)[0]
    let left = []
    let right = []

    for(let i = 0; i < arr.length; i++) {
        if(arr[i] < pivot) {
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }
    
    return quickSort(left).concat([pivot], quickSort(right))
}


// 测试
let arr = [-2, -4, 2, 12, 11, 24, 13, 88, 6, 6, 6, 0]
console.log(quickSort(arr));