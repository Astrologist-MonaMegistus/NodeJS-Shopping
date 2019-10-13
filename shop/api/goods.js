// 1.导入模块
const http = require('http')
const mysql = require('mysql')
const url = require('url')
const util = require('./util')

// 2. 配置
const connection = util.mysqlconnect(mysql)

// 3. 创建web服务器响应数据
http.createServer((req, res) => {
    // 1. 接受参数
    let getData = url.parse(req.url, true).query

    // 首页
    let isBest = getData.isBest
    let isHot = getData.isHot
    // 列表
    let pageno = getData.pageno
    // 公共
    let pagesize = getData.pagesize
    // 排序
    let order = getData.order 
    // 搜索
    let title = getData.title 

    // 2.拼接SQL语句（难） -> 发送SQL语句 -> 响应
    let sql = 'select * from goods where 1 '

    if (isBest) sql += ' and is_best = 1'
    if (isHot) sql += ' and is_hot = 1'
    if (title) sql += ` and title like '%${title}%'`
    if (order) sql += ` order by small_price ${order}`
    if (pageno) {
        let startno = (pageno - 1) * pagesize
        sql += ` limit ${startno}, ${pagesize}`
    }
    if (pagesize && !pageno) sql += ` limit ${pagesize}`

    // console.log(sql) 
    // where order limit
    // 发送sql语句
    connection.query(sql, function (error, results, fields) {
        if (error) throw error;
        util.response(res, '操作成功', 200, results)
    })
}).listen(3001)