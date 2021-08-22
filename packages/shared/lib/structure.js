/**
 * @author lihh
 * @description 获取组件库的目录结构
 * @param basePath 表示基础路径
 * @param isLerna 是否支持用lerna管理项目
 */
const getLibray = (basePath, isLerna = true) => {
    const dirArr = {
        value: basePath,
        children: [
            {value: 'builds'},
            {value: 'packages', children: [
                {value: 'theme-chalk'}
            ]},
            {value: 'story'},
            {value: 'typings'},

        ]
    }
    return dirArr
}

/**
 * @author lihh
 * @description 获取项目的目录结构
 * @param {*} plugins 需要插件
 * @param {*} basePath 表示基础路径
 */
const getProject = (basePath, plugins) => {
    const dirArr = {
        value: basePath,
        children: [
            {value: 'public'},
            {value: 'src', children: [
                {value: 'api'},
                {value: 'assets'},
                {value: 'components'},
                {value: 'router'},
                {value: 'store'},
                {value: 'views'}
            ]}
        ]
    }
    return dirArr
}

module.exports = {
    getLibray,
    getProject
}