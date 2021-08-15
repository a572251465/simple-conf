/**
 * @author lihh
 * @description 判断某个包是否已经注册
 * @param {*} packageName 一般都是表示包名称
 */
function isPackageInsall(packageName) {
    try {
        const requireFile = require(packageName)
        return !!requireFile
    } catch(e) {
        return false
    }
}

/**
 * @author lihh
 * @description 进行统一的log打印
 * @param {*} content 表示统一打印的内容
 * @param {*} grade 分别的是打印的等级 error warning info success
 */
function printLog(content, grade = 'error') {
    content = Array.isArray(content) ? content : [content]
    // -- 判断是否安装某个指定的包
    const isInstallChalk = isPackageInsall('chalk')

    let makeCorr = isInstall => {
        return !isInstall ? () => {
            return {
                error: console.error,
                warning: console.warn,
                info: console.info,
                success: console.log
            }
        } : () => {
            const chalk = require('chalk')
            return {
                error: chalk.red,
                warning: chalk.yellow,
                info: chalk.blue,
                success: chalk.green
            }
        }
    }
    makeCorr = makeCorr(isInstallChalk)
    let tools = makeCorr()

    // -- 开始执行打印
    let fn = tools[grade] || console.log
    content.forEach(detail => console.log(fn(detail)))

    // -- 进行占用内存清空
    makeCorr = null
    tools = null
    fn = null
}

module.exports = {
    isPackageInsall,
    printLog
}