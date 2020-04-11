let express = require('express');
let app = express();
let mysql = require('mysql');
let conn = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '123',
    database: 'xjr'
})
//连接到数据库
conn.connect();

app.all("*", function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
});


//准备接口，需要参数name/houser
app.get('/ready', function (req, res) {
    let name = req.query.name;
    let houser = req.query.houser;
    let sql = 'select * from blackWithe where houser=?'
    conn.query(sql, [houser], function (err, rs) {
        if (err) throw err;
        if (rs.length === 0) {
            //初始化棋盘
            let checked = '000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';
            console.log(checked.length)
            let sql1 = `insert into blackWithe(play1,checked,houser) values(?,?,?)`;
            conn.query(sql1, [name, checked, houser], function (err, rs) {
                if (err) throw err;
                res.send('play1');
            })
        } else {
            let msg = rs[0];
            //如果第一个位置已经有玩家了 就把该玩家放到第二位置
            if (!msg.play2) {
                let sql1 = "update blackWithe set play2=? where houser=?";
                conn.query(sql1, [name, houser], function (err, rs) {
                    if (err) throw err;
                    res.send('play2')
                })
            } else {
                res.send('房间已经满人了！');
            }
        }
    })
})

app.get('/onplay', function (req, res) {
    let houser = req.query.houser;
    let checked = req.query.checked;
    let onplay = req.query.onplay;
    if(checked&&onplay&houser){
        res.send('数据缺失');
    } else{
        let sql = "update blackWithe set checked=?,who=? where houser=?";
        console.log([checked,onplay,houser])
        conn.query(sql,[checked,onplay,houser],function(err,rs){
            if(err) throw err;
            console.log('输入成功')
            res.send('输入成功')
        })
    }

})


app.get('/int', function (req, res) {
    let houser = req.query.houser;
    let sql = 'select * from blackWithe where houser=?';
    conn.query(sql,[houser],function(err,rs){
        if(err) throw err;
        // console.log(rs[0])
        res.send(rs[0])
    })

})


app.get("/", function (req, res) {
    res.send("访问成功")
})

app.listen(8803)