const Admin = require('../models/admin').Admin;

/**
 * 增加一个用户
 * @param {Object} desc 要增加的地址
 */
module.exports.addAdmin = async (desc = {}) => {
    return await Admin.create(desc);
}

/**
 * 修改一个用户
 * @param {string} _id  用户id
 * @param {object} desc 用户信息
 */
module.exports.updataAdmin = async (_id, desc = {}) => {
    return await Admin.updateOne({ _id }, desc);
}

/**
 * 删除一个用户
 * @param {string} _id 
 */
module.exports.removeAdmin = async (_id) => {
    return await Admin.deleteOne({ _id })
}

/**
 * 根据用户ObjectId或者openID进行查询用户
 * @param {string} _id 用户id
 * @param {string} openId 用户openID
 * @returns 返回查询结果
 */
module.exports.findOne = async (_id = "", openId = "") => {
    let orList = [{ openId }];
    if (_id) {
        orList.push({ _id });
    }
    return await Admin.findOne({ $or: orList });
}