const logger = require('../models/logger');


/**
 * 添加一条
 * @param {Object} desc 
 */
module.exports.add = async (desc = {}) => {
    return await logger.create(desc);
}

/**
 * 删除一条
 * @param {String} id 
 */
module.exports.del = async (id = "") => {
    return await logger.deleteOne({ _id: id })
}

/**
 * 修改一条
 * @param {String} id 
 * @param {Object} desc 
 */
module.exports.updata = async (id, desc = {}) => {
    return await logger.updateOne({ _id: id }, desc)
}

/**
 * 查询单日
 * @param {Number} time 
 */
module.exports.findOne = async (time = 0) => {
    return await logger.findOne({ time })
}

/**
 * 查询范围
 * @param {Number} start 
 * @param {Number} end 
 */
module.exports.findMany = async (start, end) => {
    return await logger.find({
        time: {
            $gte: start,
            $lte: end
        }
    })
}