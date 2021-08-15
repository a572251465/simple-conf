#! /usr/bin/env node

// -- 引入关联的工具包
const {program} = require('commander')

// -- 进行交互式访问
program.command('create <app-name>')
    .description('create a new project powered by cli service')
    .action(appName => {
        require('../lib/create')(appName)
    })

// -- 让commander 进行参数解析
program.parse(process.argv)
