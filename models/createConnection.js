const mongoose = require('mongoose');
mongoose.connect('mongodb://root:root@81.70.89.166/fang', {
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