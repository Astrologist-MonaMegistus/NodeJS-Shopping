
function mysqlconnect(mysql) {
    const connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : 'h5'
    });
    connection.connect();

    return connection
}

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

// exports.属性名 = 值
// 互为别名
module.exports = {
    mysqlconnect,
    response
}