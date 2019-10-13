// 1. 设计数据库

// 2. 定义接口

    // 商品首页   得传参数  is_best 和 is_hot 和 pagesize 显示个数

    // 商品列表   得传参数  第几页 pageno   每页显示条数 pagesize

    // 结论：有几个参数 4个

    // 1. 接受参数（4个）

    // 2. 先拼接sql语句（难），再发送sql语句查询数据

        // 场景：
        // 首页 ->   
            // is_best和pagesize        select * from goods where 1  and is_best = 1 limit 5
            // is_hot和pagesize         select * from goods where 1  and is_hot = 1  limit 5
        // 列表 -> select * from goods where 1  limit ${startno},${pagesize}
        // 其他页查询商品，例如查询全部商品 （一个参数别传） ->  select * from goods where 1

        let sql = 'select * from goods where 1'  //where 1  相当于没有任何条件
                                                  // 目的 后期其他条件都是 and 字段 = 值
                                                  // 
        if (is_best) sql += ` and is_best = 1`    // 脚下留心：and 前面留一个空格
        if (is_hot) sql += ` and is_hot = 1`
        if (pageno) { // 列表
            // sql += ` limit 起始位置,每页显示条数`
            let startno = (pageno - 1) * pagesize
            sql += ` limit ${startno},${pagesize}`
        }
        // 首页
        if (!pageno && pagesize) sql += ` limit ${pagesize}`

        // sql 去查询响应
    // 3. 响应数据

// 3. 请求接口
