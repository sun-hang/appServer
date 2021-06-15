const mongoose = require('mongoose');
const Options = require('./productOptionSchema');
/**
 * 添加一个属性，用于商品状态:上架下架
 * 未解决：小程序还需判断库存是否充足，加入购物车是和详情页时要判断
 */

let productTypes = {
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
    detail: {
        type: String,
        required: true
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
    /**
     * 商品状态，是否上架 0上架销售中 1待上架 2下架
     */
    state: {
        type: Number,
        default: 0
    },
    //商品规格价格
    optionsDetail: {
        type: [Options.optionDetail],
        default: []
    }
}

const productSchema = new mongoose.Schema({
    ...productTypes
})
module.exports.module = productTypes;
module.exports.Product = mongoose.model('Product', productSchema);
