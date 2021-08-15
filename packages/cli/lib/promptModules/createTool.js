module.exports = cli => {
    cli.injectFeature({
        name: 'choose create tool',
        value: 'createTool',
        description: 'Select a tool to build a project or component library',
        checked: true
    })

    cli.injectPrompt({
        name: 'createTool',
        when: answers => answers.features.includes('createTool'),
        message: 'Select a tool to build a project or component library',
        type: 'list',
        choices: [
            {
                name: 'webpack@last',
                value: 'webpack'
            },
            {
                name: 'vite@last',
                value: 'vite'
            },
            {
                name: 'rollup@last',
                value: 'rollup'
            }
        ],
        detault: '3'
    })

    cli.onPromptComplete((answers, options) => {
        if (answers.createTool) {
            options.createTool = answers.createTool
        }
    })
}