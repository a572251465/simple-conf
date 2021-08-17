const {createTools, createPurpose, createSuportTs, createSuportStyle, createSuportVuexOrRouter, createSuportMonorepo} = require('../promptModules/commonTool')

/**
 * @author lihh
 * @description 获取要弹出的选项
 */
function getPromptModules() {
    return ['webpack', 'rollup', 'vite'].map(name => {
        return cli => {
            cli.injectFeature(createTools(name))

            cli.injectPrompt(createPurpose())
        
            cli.injectPrompt(createSuportTs())
        
            cli.injectPrompt(createSuportVuexOrRouter())
        
            cli.injectPrompt(createSuportStyle())
        
            cli.injectPrompt(createSuportMonorepo())
        
            cli.onPromptComplete((answers, options) => {
                // -- 表示回答内容收集
                if (answers.preset) {
                    options.preset = answers.preset
                }
                if (answers.features) {
                    options.features = answers.features
                }
                if (answers.createPurpose) {
                    options.createPurpose = answers.createPurpose
                }
                if (answers.typeScript) {
                    options.typeScript = answers.typeScript
                }
                if (answers.suportMonorepoLerna) {
                    options.suportMonorepoLerna = answers.suportMonorepoLerna
                }
                if (answers.vuePlugins) {
                    options.vuePlugins = answers.vuePlugins
                }
                if (answers.styleHandle) {
                    options.styleHandle = answers.styleHandle
                }
            })
        }
    })
}

module.exports = {
    getPromptModules
}