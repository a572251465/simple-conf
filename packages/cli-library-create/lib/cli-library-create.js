'use strict'
const {rollupComponentConfig} = require('../template/builds/rollup.component-template')
const {rollupEsmConfig} = require('../template/builds/rollup.esm-template')
const {webpackUmdConfig} = require('../template/builds/webpack.umd-template')
const {generatorVueTypeFile} = require('../template/typings/vue-shim.d')

/**
 * @author lihh
 * @description 组件库package等文件创建
 * @param {*} config cli支持的配置文件
 * @param {*} resultConfig 生成结果文件
 */
function create(config, resultConfig) {
    const {suportMonorepoLerna, typeScript} = config
    if (!suportMonorepoLerna || !typeScript) {
        return false
    }
    const {inputLibraryName} = config

    // -- ts配置文件
    const tsConfig = require('../template/tsconfig-template.json')
    resultConfig['tsconfig.json'] = tsConfig

    // -- package配置文件
    const packageConfig = require('../template/package-template.json')
    packageConfig['name'] = inputLibraryName
    resultConfig['package.json'] = packageConfig

    // -- lerna配置文件
    const lernaConfig = require('../template/lerna-template.json')
    resultConfig['lerna.json'] = lernaConfig

    // -- babel配置文件
    const babelConfig = require('../template/babel-config-template')
    resultConfig['babel.config.js'] = babelConfig

    // -- eslint配置文件
    const eslintConfig = require('../template/eslintrc-template')
    resultConfig['.eslintrc.js'] = eslintConfig

    // -- 编译文件
    resultConfig['builds/rollup.component.js'] = rollupComponentConfig(inputLibraryName)
    resultConfig['builds/rollup.esm.js'] = rollupEsmConfig(inputLibraryName)
    resultConfig['builds/webpack.umd.js'] = webpackUmdConfig(inputLibraryName)

    // -- vue识别文件
    resultConfig['typings/vue-shim.d.ts'] = generatorVueTypeFile()

    return true
}

module.exports = {
    create
}