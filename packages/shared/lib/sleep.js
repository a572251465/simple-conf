/**
 * @author lihh
 * @description 进行时间睡眠 等待加载
 * @param {*} time 
 */
const sleep = (time = 5000) => {
    return new Promise(resolve => {
        let timer = setTimeout(() => {
            resolve()
            clearTimeout(timer)
            timer = null
        }, time)
    })
}

module.exports = {
    sleep
}