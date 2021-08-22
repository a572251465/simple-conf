'use strict';
const {runCommand} = require('@simple-conf/shared')

/**
 * @author lihh
 * @description 进行安装包的注册
 * @param {*} rootPath 
 * @param {*} config 
 */
const install = async (rootPath, config) => {
    const {createTool} = config
    return await runCommand(createTool, ['install'], {cwd: rootPath})
}

module.exports = {
    install
}