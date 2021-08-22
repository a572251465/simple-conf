'use strict';

const { print } = require("@simple-conf/shared")
const path = require('path')
const {assignPathWriteFile} = require('@simple-conf/cli-file-generator')

/**
 * @author lihh
 * @description 进行文件内容写入
 * @param {*} rootPath 
 * @param {*} resultConfig 
 */
const writeContent = (rootPath, resultConfig) => {
    try {

        // -- 循环遍历 生成文件
        const keys = Object.keys(resultConfig)
        let i = 0
        for (; i < keys.length; i ++) {
            const filePath = path.resolve(rootPath, keys[i])
            assignPathWriteFile(filePath, resultConfig[keys[i]])
        }
        return true
    } catch(e) {
        print.red('create library config fail')
        print.red(e)
        return false
    }
}

module.exports = {
    writeContent
}