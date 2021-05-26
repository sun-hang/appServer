const mongoose = require('mongoose');
// const url = 'mongodb://root:980529@81.70.89.166/fang';
const url = 'mongodb://root:980529@127.0.0.1/fang';
// const url = 'mongodb://127.0.0.1/miao';
mongoose.connect(url, {
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