/**
 * @author lihh
 * @description 代码生成工具的提示用语
 * @param {*} name 工具名称
 */
const createTools = name => {
    return {
        name,
        value: name,
        checked: true,
        description: `make ${name} generator project`
    }
}

/**
 * @author lihh
 * @description 生成用途
 * @param {*} cond 条件 满足某些场景下进行显示
 */
const createPurpose = (cond) => {
    const options = {
        name: 'createPurpose',
        message: 'Are you building a project / library',
        type: 'list',
        choices: [
            {
                name: 'project',
                value: 'project'
            },
            {
                name: 'library',
                value: 'library'
            }
        ],
        detault: '2'
    }
    if (cond) {
        options['when'] = answers => answers.features.includes(cond)
    }
    return options
}

/**
 * @author lihh
 * @description 创建是否支持ts
 */
const createSuportTs = () => {
    return {
        name: 'typeScript',
        message: 'Add support for the TypeScript language',
        value: 'ts',
        type: 'confirm',
        when: answers => answers.createPurpose.includes('library'),
        description: 'Add support for the TypeScript language'
    }
}

/**
 * @author lihh
 * @description 创建支持vuex 以及vue-router
 */
const createSuportVuexOrRouter = () => {
    return {
        name: 'vuePlugins',
        value: 'vuePlugins',
        type: 'checkbox',
        message: 'Please select the plug-in to be supported',
        when: answers => answers.createPurpose.includes('project'),
        description: ' Please select the plug-in to be supported',
        choices: [
            {
                name: 'Vuex',
                value: 'vuex'
            },
            {
                name: 'VueRouter',
                value: 'vue-router'
            },
            {
                name: 'TypeScript',
                value: 'typescript'
            }
        ]
    }
}

/**
 * @author lihh
 * @description 支持样式处理
 * @param {*} name 
 */
const createSuportStyle = () => {
    const options = {
        name: 'styleHandle',
        value: 'styleHandle',
        type: 'list',
        message: 'Please select a style processing language',
        description: ' Please select a style processing language',
        when: answers => answers.createPurpose.includes('project'),
        choices: [
            {
                name: 'Sass/SCSS (with dart-sass)',
                value: 'scss'
            },
            {
                name: 'Less',
                value: 'less'
            },
            {
                name: 'Css',
                value: 'css'
            }
        ]
    }
    return options
}

/**
 * @author lihh
 * @description 创建组件库的是否支持monorepo + lerna 来创建
 */
const createSuportMonorepo = () => {
    return {
        name: 'suportMonorepoLerna',
        value: 'suportMonorepoLerna',
        type: 'confirm',
        message: 'Do you support lerna + monorepo to create projects?',
        description: ' Do you support lerna + monorepo to create projects?',
        when: answers => answers.createPurpose.includes('library'),
    }
}

/**
 * @author lihh
 * @description 创建项目的工具
 */
const createProjectTool = () => {
    return {
        name: 'createTool',
        value: 'createTool',
        type: 'list',
        message: 'Please select create project/library tool',
        description: 'Please select create project/library tool',
        choices: [
            {
                name: 'Use NPM',
                value: 'npm'
            },
            {
                name: 'Use YARN',
                value: 'yarn'
            },
            {
                name: 'Cancel',
                value: false
            }
        ]
    }
}

/**
 * @author lihh
 * @description 输入库名称
 */
const inputLibraryName = () => {
    return {
        name: 'libraryName',
        value: 'libraryName',
        type: 'input',
        message: 'Please input library name: ',
        description: 'Please input library name: ',
        when: answers => answers.createPurpose.includes('library')
    }
}

module.exports = {
    createTools,
    createPurpose,
    createSuportTs,
    createSuportVuexOrRouter,
    createSuportStyle,
    createSuportMonorepo,
    createProjectTool,
    inputLibraryName
}