const fs = require('fs')
const path = require('path')
const {print} = require('@simple-conf/shared')
const fileSuffix = ['.json', '.js', '.ts', '.tsx', '.html', '.scss', '.less', '.css', '.jsx', '.vue']

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
 * @description 进行路径地址格式化
 * @param {*} paths 传递的path路径
 */
const pathFormat = paths => {
    if (!paths  || typeof paths === 'object') return paths
    if (typeof paths === 'string') {
        paths = paths.split(path.sep)
    }
    paths = Object.assign([], paths)
    const result = {value: '', children: []}
    let currentNode = result

    while(paths.length > 0) {
        const surplus = paths.shift()
        currentNode.value = surplus
        const workspaces = {value: '', children: []}
        if (paths.length > 0) {
            currentNode.children.push(workspaces)
            currentNode = workspaces
        }
    }
    return result
}

/**
 * @author lihh
 * @description 生成文件 为了生成目录
 * @param {*} paths 数组 || 字符串 || 对象
 */
const generatordir = paths => {
    try {
        if (paths && typeof paths !== 'object') {
            paths = path.normalize(paths)
            // -- 进行数据格式化
            paths = pathFormat(paths)
        }

        // -- 进行文件生成
        const createFile = (dirArr, prefixPath = '') => {
            const {value, children = []} = dirArr
            const dir = prefixPath ? path.resolve(prefixPath, value) : value
            const isFile = isFileExists(dir)
            const isDir = isDirExists(dir)

            // -- 判断是否是文件
            if (isFile) {
                return false
            }

            // -- 判断是否是目录
            if (isDir) {
                children.forEach(pathName => {
                    createFile(pathName, dir)
                })
                return false
            }

            // -- 用来生成文件或是文件夹 包含指定后缀 || 名字中包含点 就认为是文件 不是文件夹
            const isCreateFile = fileSuffix.some(suffix => value.endsWith(suffix)) || value.includes('.')
            if (!isCreateFile) {
                fs.mkdirSync(dir)
            }
            if (children.length > 0) {
                children.forEach(pathName => {
                    createFile(pathName, dir)
                })
            }
        }
        createFile(paths)
    } catch(e) {
        print.red(e)
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
    generatordir,
    removeFile
}