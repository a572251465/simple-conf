const {sleep} = require('./sleep')
const {loadding} = require('./loading')
const {print} = require('./print')

/**
 * @author lihh
 * @description 设置加载延时效果
 * @param {*} textObj 
 */
const loadingTimeOut = async (text = {}) => {
    const {start, end} = text
    loadding.text(start)
    await sleep()
    console.log('\n')
    console.log(print.yellowBright(end, true))
}

module.exports = {
    loadingTimeOut
}