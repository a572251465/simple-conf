class PromptModuleAPI {
    constructor(creator) {
        this.creator = creator
    }

    injectFeature(feature) {
        this.creator.featurePrompt.choices.push(feature)
    }

    injectPrompt(prompt) {
        this.creator.injectPrompts.push(prompt)
    }

    onPromptComplete(cb) {
        this.creator.promptComleteCbs.push(cb)
    }
}

module.exports = PromptModuleAPI