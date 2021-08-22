const {defaults} = require('./options')
const isManualMode = answers => answers.preset === '__manual__'
const PromptModuleAPI = require('./PromptModuleAPI')
const inquirer = require('inquirer')
const {print, loadding, getProject, getLibray} = require('@simple-conf/shared')
const {isDirExists, removeFile, generatordir} = require('@simple-conf/cli-file-generator')
const path = require('path')

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
                'default': `Default（${print.yellowBright('Webpack Generator Project', true)}）`,
                'default_library': `Default（${print.yellowBright('Webpack Generator Library', true)}）`
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
        // 表示支持依赖
        let supportPreset = {
            preset: null,
            features: null,
            createPurpose: null,
            // -- library相关
            typeScript: null,
            suportMonorepoLerna: null,
            // -- project相关
            vuePlugins: null,
            styleHandle: null,
            // -- 创建工具
            createTool: null,
            // -- 组件库名称
            inputLibraryName: null
        }
        this.promptComleteCbs.forEach(fn => fn(answers, supportPreset))

        // -- 进行默认选项合并
        if (supportPreset.preset === 'default') {
            supportPreset = Object.assign({}, supportPreset, defaults.presets['default'])
        }
        if (supportPreset.preset === 'default_library') {
            supportPreset = Object.assign({}, supportPreset, {inputLibraryName: this.name}, defaults.presets['default_library'])
        }
        // -- 判断是否允许使用工具
        if (!supportPreset.createTool) {
            print.red('Please install NPM or YARN')
            return false
        }

        const dir = path.resolve(this.contextPath, this.name)
        const status = isDirExists(dir)
        // -- 后续开始处理
        const afterHandle = () => {
            const {createPurpose} = supportPreset

            const resultConfig = {}
            // -- 1. 开始生成目录结构
            const structure = createPurpose === 'project' ? getProject(dir) : getLibray(dir)
            generatordir(structure)

            // -- 2. 执行调度文件 开始执行
            
        }
        if (!status) {
            afterHandle()
            return false
        }
        // -- 询问是否删除目录
        const {action} = await inquirer.prompt([
            {
                name: 'action',
                type: 'list',
                message: `Target directory ${print.cyan(dir, true)} already exists. Pick an action:`,
                choices: [
                    {name: 'Overwrite', value: 'overwrite'},
                    {name: 'Cancel', value: false}
                ]
            }
        ])
        if (!action) {
            return false
        }

        loadding.start(`the directory ${print.cyan(dir, true)} start overwrite`)
        await removeFile(dir)
        loadding.stop()
        afterHandle()
    }
}

module.exports = Creator