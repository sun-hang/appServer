const express = require('express');
const app = express();
const cors = require('cors');

// 跨域设置
app.use(cors({
    origin(origin, callback) {
        callback(null, true)
    }
}))

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

// 错误处理中间件
app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err)
    }
    res.status(500)
    res.render('error', { error: err })
})

// 开启监听并执行回调函数
app.listen(12307, () => {
    console.log('开始监听12307端口');
})