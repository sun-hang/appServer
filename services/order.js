const Order = require('../models/order');

/**
 * 添加一条或多条订单数据
 * @param {*} desc 要添加的数据，一个对象或者一个数组
 * @returns 
 */
module.exports.addOrder = async (desc = {}) => {
    return await Order.create(desc);
}

/**
 * 
 * @param {string} _id 订单ID
 * @param {object} desc 修改的数据
 * @returns 返回修改后的数据
 */
module.exports.updataOrder = async (_id, desc = {}) => {
    return await Order.updateOne({ _id }, desc);
}

/**
 * 删除一条订单数据
 * @param {string} _id 订单id
 * @returns 返回删除后的结果
 */
module.exports.removeOrder = async (_id) => {
    return await Order.deleteOne({ _id });
}

/**
 * 分页查询订单数据,默认倒叙
 * @param {Number} page 分页页码
 * @param {Number} size 分页页容量
 * @param {Number} state 订单状态 0-未支付 1-支付未发货 2-已发货 3-已收货 4-已取消 -1-不添加此条件
 * @param {Boolean} isDelete 用户端是否已删除
 * @param {String} _id 用户objectId
 */
module.exports.findByPage = async (page = 1, size = 10, state = -1, isDelete = false, _id = '', orderTime = -1) => {
    const filter = {
        isDelete
    };
    if (state != -1) {
        filter.state = state;
    }
    if (_id) {
        filter.adminId = _id;
    }
    if (page != -1) {
        return {
            result: await Order.find(filter).limit(size).skip((page - 1) * size).sort({ orderTime }),
            count: await Order.find(filter).limit(size).skip((page - 1) * size).sort({ orderTime }).countDocuments()
        }
    }
    return await Order.find(filter).sort({ orderTime })
}

module.exports.findOne = async (_id) => {
    return await Order.findById(_id)
}