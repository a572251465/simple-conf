/**
 * @author lihh
 * @description 生成vue识别依赖文件
 */
const generatorVueTypeFile = () => {
    return `
        declare module '*.vue' {
            import { App, defineComponent } from 'vue'
            const component: ReturnType<typeof defineComponent> & {
            install(app: App): void
            }
            export default component
        }
    `
}

module.exports = {
    generatorVueTypeFile
}