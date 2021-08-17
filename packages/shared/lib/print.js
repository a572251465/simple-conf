const chalk = require('chalk')
let chalkKeys = [
    'black',
    'red',
    'green',
    'blue',
    'magenta',
    'cyan',
    'white',
    'gray',
    'grey',
    'blackBright',
    'redBright',
    'greenBright',
    'yellowBright',
    'blueBright',
    'magentaBright',
    'cyanBright',
    'whiteBright'
]
chalkKeys = chalkKeys.concat(chalkKeys.map(color => {
    const showChar = color.slice(0, 1)
    const arr = ['bg', showChar.toLocaleUpperCase(), color.slice(1)]
    return arr.join('')
}))

/**
 * @author lihh
 * @description 进行统一的log打印
 * @param {*} content 表示统一打印的内容
 * @param {*} isReturn 表示是否返回
 */
 const print = chalkKeys.reduce((pre, cur) => {
    pre[cur] = (content, isReturn) => {
        if (isReturn) {
            return chalk[cur](content)
        }
        console.log(chalk[cur](content))
    }
    return pre
 }, {})

 module.exports = {
    print
 }