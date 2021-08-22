const cp = require('child_process')

/**
 * @author lihh
 * @description 进行命令执行
 * @param {*} command 执行命令
 * @param {*} args 以及参数
 * @param {*} options 需要额外配置参数
 */
const runCommand = (command, args, options) => {

    return new Promise((resolve, reject) => {
        const executedCommand = cp.spawn(command, args, {
			stdio: "inherit",
			shell: true,
            ...options
		})

        executedCommand.on('error', error => {
            reject(error)
        })

        executedCommand.on('exit', code => {
            if (code === 0) {
                resolve()
            } else {
                reject()
            }
        })
    })
}

module.exports = {
    runCommand
}