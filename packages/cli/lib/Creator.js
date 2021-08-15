const {defaults} = require('./options')
const isManualMode = answers => answers.preset === '__manual__'
const PromptModuleAPI = require('./PromptModuleAPI')
const inquirer = require('inquirer')

class Creator {
    constructor(name, contextPath, promptModules) {
        this.name = name
        this.contextPath = contextPath
        const {presetPrompt, featurePrompt} = this.resolveIntroPrompts()
        this.presetPrompt = presetPrompt
        this.featurePrompt = featurePrompt
        this.injectPrompts = []
        this.promptComleteCbs = []
        const PromptAPI = new PromptModuleAPI(this)
        promptModules.forEach(m => m(PromptAPI))
    }

    getPresets() {
        return Object.assign({}, defaults.presets)
    }

    resolveIntroPrompts() {
        const presets = this.getPresets()
        const presetChoices = Object.entries(presets).map(([name]) => {
            let displayName = name
            if (name === 'default') {
                displayName = 'Default'
            }
            return {
                name: displayName,
                value: name
            }
        })

        // -- 设置手动选择档
        const presetPrompt = {
            name: 'preset',
            type: 'list',
            message: 'Please a create tool',
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
            type: 'checkbox',
            message: 'choose a create project/library tool',
            choices: []
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
        let preset = await this.promptAndResolvePresets()
    }
}

module.exports = Creator