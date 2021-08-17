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
                console.log(answers, '--webpack')
            })
        }
    })
}

module.exports = {
    getPromptModules
}