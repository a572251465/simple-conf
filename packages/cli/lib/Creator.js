const {defaults} = require('./options')
const isManualMode = answers => answers.preset === '__manual__'
const PromptModuleAPI = require('./PromptModuleAPI')
const inquirer = require('inquirer')

class Creator {
    constructor(name, contextPath, promptModules) {
        this.name = name
        this.contextPath = contextPath
        // -- 解析预设 以及特性
        const {presetPrompt, featurePrompt} = this.resolveIntroPrompts()
        this.presetPrompt = presetPrompt
        this.featurePrompt = featurePrompt
        this.injectPrompts = []
        this.promptComleteCbs = []
        const PromptAPI = new PromptModuleAPI(this)
        promptModules.forEach(m => m(PromptAPI))
    }

    /**
     * @author lihh
     * @description 用来获取默认的预设
     * @returns 返回默认的预设
     */
    getPresets() {
        return Object.assign({}, defaults.presets)
    }

    /**
     * @author lihh
     * @description 解析prompts循环内容
     * @returns 返回预设 以及对应的特性
     */
    resolveIntroPrompts() {
        const presets = this.getPresets()
        const presetChoices = Object.entries(presets).map(([name]) => {
            let displayName = name
            const transformTips = {
                'default': 'Default（webpack generator project）',
                'default_library': 'Default（webpack generator library）'
            }
            displayName = transformTips[name]
            return {
                name: displayName,
                value: name
            }
        })

        // -- 设置手动选择档 以及默认档合并
        const presetPrompt = {
            name: 'preset',
            type: 'list',
            message: 'Please pick a preset',
            choices: [
                ...presetChoices,
                {
                    name: 'Manually select features',
                    value: '__manual__'
                }
            ]
        }

        // -- 设置选择预设
        const featurePrompt = {
            name: 'features',
            when: isManualMode,
            type: 'list',
            message: 'choose a create project/library tool',
            choices: [],
            pageSize: 3
        }

        return {
            // -- 预设
            presetPrompt,
            // -- 预设对应特性
            featurePrompt
        }
    }

    async promptAndResolvePresets() {
        let answers = await inquirer.prompt(this.resolveFinalPrompts())
        return answers
    }

    resolveFinalPrompts() {
        this.injectPrompts.forEach(prompt => {
            const originWhen = prompt.when || (() => true)
            prompt.when = answers => {
                return isManualMode(answers) && originWhen(answers)
            }
        })
        const prompts = [
            this.presetPrompt,
            this.featurePrompt,
            ...this.injectPrompts
        ]
        return prompts
    }

    async create() {
        let answers = await this.promptAndResolvePresets()
        console.log(answers)
    }
}

module.exports = Creator