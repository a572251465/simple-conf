exports.defaults = {
    presets: {
        // -- 设置默认的预设
        'default': {
            features: 'webpack',
            createPurpose: 'project',
            vuePlugins: [ 'vuex', 'vue-router', 'typescript' ],
            styleHandle: 'scss'
        },
        'default_library': {
            features: 'webpack',
            createPurpose: 'library',
            typeScript: true,
            suportMonorepoLerna: true
        }
    }
}