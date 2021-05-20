const mongoose = require('mongoose');
const productSchema = require('./product').module;
const addressSchema = require('./admin').address;

const typeSchema = new mongoose.Schema({
    name: { //规格名例：999-大
        type: String,
        required: true
    },
    price: { //单价
        type: Number,
        required: true,
        min: 0.1
    },
    count: { //购买数量
        type: Number,
        required: true,
        min: 1
    },
    checked: { //可以不传，表示购物车选中状态
        type: Boolean
    },
    total: { //总价
        type: Number,
        required: true
    },
    stock: { //库存，先放着，可能没用
        type: Number,
        min: 0
    }
})

const productItemSchema = new mongoose.Schema({
    ...productSchema, //所有的商品信息
    type: { //商品规格信息和购买数量及价格
        type: typeSchema,
        required: true
    }
})

const orderSchema = new mongoose.Schema({
    /**
     * 一个订单可能会有多个商品
     */
    products: {
        type: [productItemSchema],
        default: []
    },

    adminId: {  //用户id
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    address: { //收货地址
        type: addressSchema,
        required: true
    },
    state: { //订单状态 0-未支付 1-支付未发货  2-待收货 3-已收货 4-完成
        type: Number,
        required: true
    },
    orderNumber: { //订单号，可能用不到，先放着
        type: String
    },
    courierNumber: { //快递单号，可能用不到先放着
        type: String
    },
    isDelete: {  //是否删除
        type: Boolean,
        default: false
    },
    orderTime: {  //订单创建时间
        type: Number,
        default: Date.now
    }
})

module.exports = mongoose.model("Order", orderSchema);