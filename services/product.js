const Product = require('../models/product');

/**
 * 增删改查四个方面
 */


/**
 * 插入一条数据，可以是多条，多条为数组
 * @param {Object} option 
 * @returns {Object}
 */
module.exports.insert = async (desc = {}) => {
    let data = desc;
    if(desc.data && Array.isArray(desc.data)){
        data = desc.data;
    };
    try {
        return await Product.create(data);
    } catch (error) {
        return error
    }
}

/**
 * 
 * @param {string} id ObjectId
 * @param {Object} desc 要修改的对象
 * @returns {Object} 根据id修改单条数据
 */
module.exports.updata = async (id, desc) => {
    return await Product.updateOne({ _id: id }, desc);
}

/**
 * 删除一条数据
 * @param {string} id 
 * @returns {Object}
 */
module.exports.remove = async (id) => {
    return await Product.deleteOne({ _id: id });
}

/**
 * 
 * @param {object} queryObj {productName:"",tag:"",currentPric:{start:1,end:100}}  根据价格筛选
 * @param {object} pagerObj  {page:1,size:10}
 * @param {object} sortObj {orgingPrice:1,price:1}
 * @returns {object}
 */
module.exports.findAndByPage = async (queryObj = { productName: '', tag: '' }, pagerObj = {}, sortObj = {}) => {
    const newQueryObj = {};

    queryObj.tag = queryObj.tag ? queryObj.tag : '';
    queryObj.productName = queryObj.productName ? queryObj.productName : '';
    if (queryObj.productName && queryObj.tag) {
        newQueryObj['$or'] = [{ productName: new RegExp(queryObj.productName) }, { tag: new RegExp(queryObj.tag) }];
    } else if (queryObj.productName) {
        newQueryObj.productName = new RegExp(queryObj.productName);
    } else {
        newQueryObj.tag = new RegExp(queryObj.tag);
    }


    if (queryObj.currentPric) {
        newQueryObj.currentPric = { $gt: queryObj.currentPric.start, $lt: queryObj.currentPric.end };
    }

    let query = Product.find(newQueryObj);

    if (verificationPagerNumber(pagerObj.page)
        && verificationPagerNumber(pagerObj.size)) {
        query.limit(pagerObj.size).skip((pagerObj.page - 1) * pagerObj.size).sort(sortObj);
        return {
            result: await query,
            total: await Product.find(newQueryObj).countDocuments()
        };
    }

    return await query.sort(sortObj);

}


/**
 * 验证一个数字是否正确
 * @param {Number} value 
 * @returns {Boolean}
 */
function verificationPagerNumber(value) {
    return value && typeof value === 'number' && value >= 1;
}