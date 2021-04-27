const mongoose = require('mongoose');
const Options = require('./productOptionSchema');
const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    ctime: {
        type: Number,
        default: Date.now
    },
    originPric: {
        type: Number,
        min: 0.1,
    },
    currentPric: {
        type: Number,
        required: true,
        min: 0.1
    },
    imgs: {
        type: [String],
        default: []
    },
    // 多个可以用","分割
    tag: {
        type: String,
        required: true
    },
    /**
     * 库存剩余数量
     */
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    // 商品规格信息
    options: {
        type: [Options.option],
        default: []
    },
    //商品规格价格
    optionsDetail: {
        type: [Options.optionDetail],
        default: []
    }
})

module.exports = mongoose.model('Product', productSchema);