// 1.导入模块
const http = require('http')
const url = require('url')
const mysql = require('mysql')
const util = require('./util')
const md5 = require('md5') // npm i md5
// 2. 配置
const connection = util.mysqlconnect(mysql)

// 3. 创建web服务器响应数据
http.createServer((req, res) => {

    // 1. 获取参数
    let getData = url.parse(req.url, true).query  // {uname:数据，pwd:数据}

    if (!getData.uname || !getData.pwd) {
        util.response(res, '参数有误', 400)
        return //目的终止后面代码执行
    }

    // 2. 根据用户名去数据库查询用户
    connection.query('select * from user', function (error, results, fields) {
        if (error) throw error;
        // results 类型数组  里面 一个数组 也就是一个对象
        // results[0] 获取这个数据  有-对象，没有-undefined
        let userinfo = results[0]

        // 过滤（判断用户在不在，判断密码对不对）
        if (!userinfo) {
            util.response(res, '用户不存在', 400)
            return //目的终止后面代码执行
        }
        if (userinfo.pwd != getData.pwd) {
            util.response(res, '用户名或密码错误', 401)
            return //目的终止后面代码执行
        }

        // 登录成功
        util.response(res, '登录成功', 200, {
            id: userinfo.id,          // 后期加入购物车，生成订单 都得用这个编号
            uname: userinfo.uname,    // 商城头部 显示用户名
            token: md5(userinfo.id + 'webopenfather') // 请求接口防止别人抓去请求，然后通过工具请求修改编号  为了安全 每次请求带上token
        })
    });
}).listen(3000)