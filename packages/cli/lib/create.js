const path = require('path')
const {printLog} = require('@simple-conf/shared')
const {getPromptModules} = require('./util/createTools')
const Creator = require('./Creator')

module.exports = (...args) => {
    return create(...args).catch(err => printLog(err))
}

/**
 * @author lihh
 * @description 进行入口创建
 * @param {*} projectName 创建项目的名称
 */
async function create(projectName) {
    const runDir = process.cwd()
    const targetDir = path.resolve(runDir, projectName)
    // -- 命令口 询问弹框
    const promptModules = getPromptModules()
    const creator = new Creator(projectName, targetDir, promptModules)
    await creator.create()
}