const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const https = require('https');
const path = require('path');
const fs = require('fs');

// 跨域设置
app.use(cors({
    origin(origin, callback) {
        callback(null, true)
    }
}))
// console.log(path.resolve(__dirname, '../option'))
// 静态文件路径
app.use(express.static('./public'))

// 解析form表单的中间件
app.use(express.urlencoded({
    extended: true
}));

//用于解析json格式数据 
app.use(express.json());

// 动态api处理接口
// app.use('/api/dynamic', require('./api/dynamic'));

// 产品api处理接口 
app.use('/api/product', require('./api/product'));

// 标签api处理接口
app.use('/api/tag', require('./api/tag'));

// 文件上传api处理接口
app.use('/api/upload', require('./api/upload'));

// 用户信息api处理接口
app.use('/api/admin', require('./api/admin'));

//订单信息处理中间件接口
app.use('/api/order', require('./api/order'))
// 错误处理中间件
app.use((err, req, res, next) => {
    // console.log(res.headersSent)
    // if (res.headersSent) {
    //     return next(err)
    // }
    res.status(500).json({ error: err.message });
})

// app.use(function (err, req, res, next) {
//     res.status(500).send('未知错误')
//   })

// 开启监听并执行回调函数
const httpApp = http.createServer(app);
const httpsApp = https.createServer({ key: fs.readFileSync(path.resolve(__dirname, '../option/5570446_fangmmmm.top.key')), cert: fs.readFileSync(path.resolve(__dirname, '../option/5570446_fangmmmm.top.pem')) }, app)
httpApp.listen(529, () => {
    console.log('http开始监听529端口')
})

httpsApp.listen(508, () => {
    console.log('https开始监听508端口');
})
// app.listen(12307, () => {
//     console.log('开始监听12307端口');
// })