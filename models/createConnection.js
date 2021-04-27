const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/miao', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

mongoose.connection.on('open', () => {
    console.log('打开连接')
})

mongoose.connection.on('error', () => {
    console.log('连接错误！！！');
})