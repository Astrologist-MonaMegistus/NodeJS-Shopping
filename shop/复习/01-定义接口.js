// 设计数据库：页面有一个数据显示就对应一个字段，每个表（编号、....、创建于、更新于）

// 编号、图片、名字、库存、价格、促销价、创建于、更新于


// 然后通过node写接口

// 第一次：
// npm init -y   生成package.json文件  用来记录项目所需第三方模块
// npm i mysql   因为你要操作数据库
// 每个文件
// 1.创建web服务器 先响应固定的json数据 =>  js对象
// 2.导入mysql  去npmjs.com搜索mysql手册 复制代码   改一改
// 3.重启服务


//一、导入模块
const http = require('http')
const mysql      = require('mysql');
// 二、配置数据库
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'h5'
});
connection.connect();
 
// 四、创建web服务器
http.createServer((req, res)=>{// request、response

    // req.url ?id=111
    // url.parse(req.url, true).query   {id:111}

    // // mime
    // res.setHeader('content-type', 'text/html;charset=utf-8')
    // res.end('测试数据2')
    // res.setHeader('content-type', 'text/html;charset=utf-8')
    // res.end('测试数据2')
    // connection.query('select * from goods', function (error, results, fields) {
    //     if (error) throw error; 
    //     // console.log('The solution is: ', results[0].solution);

    //     // console.log(results) 
    //     // results 没有数据就是空数组 有数据就是数组
    //     // results[0] 没有数据undefined  有数组对象
    //     response(res, '操作成功', 200, results)
    // });
    
    // response(res, '操作成功', 200)
}).listen(3000)


function response(res, msg, status, data = null) {
    res.setHeader('content-type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*')
    // res.end({
    //     meta: {
    //         msg: msg,
    //         status: status
    //     },
    //     data: data
    // })
    // end方法只能响应字符串
    res.end(JSON.stringify({
        meta: {
            msg: msg,
            status: status
        },
        data: data
    }))
}