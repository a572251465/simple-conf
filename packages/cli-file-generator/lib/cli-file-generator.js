const fs = require('fs')
const path = require('path')
const {print} = require('@simple-conf/shared')

/**
 * @author lihh
 * @description 判断文件是否存在
 * @param {*} filePath 文件路径
 */
const isFileExists = filePath => {
    try {
        const stats = fs.statSync(filePath)
        if (stats.isDirectory()) {
            return false
        }
        return true
    } catch(e) {
        return false
    }
}

/**
 * @author lihh
 * @description 判断是否是目录
 * @param {*} dirPath 
 * @returns 
 */
const isDirExists = dirPath => {
    try {
        const stats = fs.statSync(dirPath)
        if (stats.isFile()) {
            return false
        }
        return true
    } catch(e) {
        return false
    }
}

/**
 * @author lihh
 * @description 生成文件
 * @param {*} structure 数组 || 字符串 || 对象
 */
const generatorFile = structure => {
    // -- 如果是字符串 进行处理
    const strHandle = () => {

    }
    // -- 如果是数组 进行处理
    const arrayHandle = () => {

    }
    // -- 如果是对象 进行处理
    const objectHandle = () => {

    }
    if (!structure) {
        return false
    }
    if (typeof structure === 'string') {
        return strHandle(structure)
    }
    if (Array.isArray(structure)) {
        return arrayHandle(structure)
    }
    if (typeof structure === 'object') {
        return objectHandle(structure)
    }
}

/**
 * @author lihh
 * @description 删除文件 可以是目录 || 具体文件
 * @param {*} dir 表示目录 初次是字符串 后期是数组
 */
const removeFile = dir => {
    return new Promise((resolve, reject) => {
        if (typeof dir !== 'string') return reject()
        const run = (dir) => {
            try {
                dir.forEach(name => {
                    const status = isFileExists(name)
                    if (status) {
                        // -- 删除文件
                        fs.unlinkSync(name)
                        return true
                    }
    
                    // -- 读取目录列表
                    const dirList = fs.readdirSync(name)
                    if (dirList.length === 0) {
                        // -- 删除目录
                        fs.rmdirSync(name)
                        return true
                    }
    
                    const newDir = dirList.map(filename => path.resolve(name, filename))
                    run(newDir)
                    fs.rmdirSync(name)
                })
            } catch (e) {
                print.red(e)
                reject()
            }
        }
        run([dir])
        resolve()
    })
}

module.exports = {
    isFileExists,
    isDirExists,
    generatorFile,
    removeFile
}