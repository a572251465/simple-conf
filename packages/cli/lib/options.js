exports.defaultPreset = {
    useConfigFiles: false,
    cssPreprocessor: undefined,
    plugins: {
        '@vue/cli-plugin-babel': {},
        '@vue/cli-plugin-eslint': {
            config: 'base',
            lintOn: ['save']
        }
    }
}

exports.defaults = {
    presets: {
        // -- 设置默认的预设
        'default': {},
        'default_library': {}
    }
}