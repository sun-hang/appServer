const Tag = require('../models/tag');

/**
 * 增删改查四个方面
 */


/**
 * 插入一条数据，可以是多条，多条为数组
 * @param {Object} option 
 * @returns {Object}
 */
module.exports.insert = async (desc = {}) => {
    try {
        return await Tag.create(desc);
    } catch (error) {
        return error;
    }
}

/**
 * 
 * @param {string} id ObjectId
 * @param {Object} desc 要修改的对象
 * @returns {Object} 根据id修改单条数据
 */
module.exports.updata = async (id, desc) => {
    return await Tag.updateOne({ _id: id }, desc);
}

/**
 * 删除一条数据
 * @param {string} id 
 * @returns {Object}
 */
module.exports.remove = async (id) => {
    return await Tag.deleteOne({ _id: id });
}

/**
 * 
 * @param {Object} queryObj {productName:"",tag:"",currentPric:{start:1,end:100}}  根据价格筛选
 * @param {object} pagerObj  {page:1,size:10}
 * @param {Object} sortObj {orgingPrice:1,price:1}
 * @returns {Object}
 */
module.exports.find = async () => {
    return await Tag.find();
}

