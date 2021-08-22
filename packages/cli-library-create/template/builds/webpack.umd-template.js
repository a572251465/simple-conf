/**
 * @author lihh
 * @description 文件用webpack打包 umd模式
 * @param libraryPrefix 库名
 */
const webpackUmdConfig = (libraryPrefix) => {
    return `
        const path = require('path'),
        { VueLoaderPlugin } = require('vue-loader')
        
        module.exports = {
            mode: 'production',
            entry: path.resolve(__dirname, '../packages/${libraryPrefix}/index.ts'),
            output: {
            path: path.resolve(__dirname, '../lib'),
            filename: 'index.js',
            libraryTarget: 'umd',
            library: '${libraryPrefix}'
            },
            externals: {
            vue: {
                root: 'Vue',
                commonjs: 'vue',
                commonjs2: 'vue'
            }
            },
            module: {
            rules: [
                {
                test: /\.vue$/,
                use: 'vue-loader'
                },
                {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
                }
            ]
            },
            resolve: {
            extensions: [ '.ts', '.tsx', '.js', '.json' ]
            },
            plugins: [
            new VueLoaderPlugin()
            ]
        }  
    `
}

module.exports = {
    webpackUmdConfig
}