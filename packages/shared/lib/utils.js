

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

module.exports = {
    isPackageInsall
}