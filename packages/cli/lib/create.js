const {print} = require('@simple-conf/shared')
const {getPromptModules} = require('./util/createTools')
const Creator = require('./Creator')

module.exports = (...args) => {
    return create(...args).catch(err => print.red(err))
}

/**
 * @author lihh
 * @description 进行入口创建
 * @param {*} projectName 创建项目的名称
 */
async function create(projectName) {
    // -- 当前程序运行目录
    const runDir = process.cwd()
    // -- 命令窗口 询问弹框
    const promptModules = getPromptModules()
    const creator = new Creator(projectName, runDir, promptModules)
    await creator.create()
}