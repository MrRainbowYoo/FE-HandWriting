// 手写 ajax 以及 使用 promise 封装
// readyState: 0, 1, 2, 3, 4 => 请求未初始化，服务器连接已建立，请求已接收，请求处理中，响应就绪

// 版本一：纯ajax
let xhr = new XMLHttpRequest()
xhr.open('GET', 'https://www.xxxxx.com', true)
xhr.onreadystatechange = function() {
    if(xhr.readyState === 4 && xhr.status === 200) {
        console.log(xhr.responseText);
    }
}
xhr.send()


// promise封装
const ajax = function(method, url, data) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()

        method = method.toUpperCase()
        if(method === 'GET') {
            let paramsArr = []
            for(let key in data) {
                params.push(key + '=' + data[key])
            }
            let paramsStr = paramsArr.join('&')
            xhr.open(method, url + '?' + paramsStr)
            xhr.send()
        } else if(method === 'POST') {
            xhr.open(method, url)
            xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded;charset=utf-8')
            xhr.send(data)
        }

        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4){
                if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304)
                    resolve(xhr.responseText)
                else
                    reject(new Error('error'))
            }
        }
    })
}


// 使用
ajax({
    method:'get',
    url:'https://www.xxxx.com',
    data: {
        name: '小陈同学吗'
    }
}).then(res => {
    console.log(res);
}, reason => {
    console.log(reason);
})