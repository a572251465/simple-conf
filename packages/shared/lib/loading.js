const ora = require('ora')
const spinner = ora()

/**
 * @author lihh
 * @description 设置文本
 * @param {*} text 文本内容 
 */
const settingText = (text) => {
    spinner.text = text
}

/**
 * @author lihh
 * @description 设置开始加载
 * @param {*} text 第一次默认可以使用文本
 */
const start = (text) => {
    if (text) {
        spinner.color = 'yellow'
        spinner.text = text
    }
    spinner.start()
}

/**
 * @author lihh
 * @description 关闭加载
 */
const stop = () => {
    spinner.stop()
}

module.exports = {
    loadding: {
        start,
        text: settingText,
        stop
    }
}