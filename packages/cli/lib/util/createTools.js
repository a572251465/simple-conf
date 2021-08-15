/**
 * @author lihh
 * @description 获取要弹出的选项
 */
function getPromptModules() {
    return ['createTool'].map(file => require(`../promptModules/${file}`))
}

module.exports = {
    getPromptModules
}