'use strict'
const cliLibraryCreate = require('@simple-conf/cli-library-create')
const cliContentWrite = require('@simple-conf/cli-content-write')
const {loadingTimeOut} = require('@simple-conf/shared')
const cliRelyOnInstall = require('@simple-conf/cli-relyoninstall')

/**
 * @author lihh
 * @description 入口执行文件
 * @param {*} rootPath 文件根目录
 * @param {*} config 创建项目支持的cli配置
 * @param {*} resultConfig 返回支持的配置
 */
async function start(rootPath, config, resultConfig) {
    // -- 1. 组件库library 的package.json 生成
    const successFlag = cliLibraryCreate.create(config, resultConfig)
    if (!successFlag) {
        return false
    }
    await loadingTimeOut({
        start: 'library config start generator...',
        end: 'library config file generator success'
    })

    // -- 2. 内容写入文件
    const writeSuccessFlag = cliContentWrite.writeContent(rootPath, resultConfig)
    if (!writeSuccessFlag) {
        return false
    }
    await loadingTimeOut({
        start: 'library file content start write...',
        end: 'library file content write success'
    })

    // -- 3. 开始注册依赖文件
    cliRelyOnInstall.install(rootPath, config)
}

module.exports = {
    start
}