const productDao = require('../dao/product');
const resultFuncs = require('../utils/resultData');
/**
 * 根据分页和关键字进行查询商品信息
 * @param {number} page 
 * @param {number} size 
 * @param {string} query 
 */
module.exports.getData = async (page = 1, size = 10, query = "") => {
    if (isNaN(page) || page < 1) {
        page = 1;
    }
    if (isNaN(size) || size < 1) {
        size = 5;
    }
    if (typeof query !== 'string') {
        return resultFuncs.resultObject(null, 'query参数错误');
    }
    return resultFuncs.resultObject(await productDao.getData(page, size, query), "查询成功");
}


/**
 * 
 * @param {string} title 
 * @param {number} price 
 * @param {number} originPrice 
 * @param {string} tag 
 * @param {string} srcs 
 */
module.exports.addData = async (title, price, originPrice, tag, srcs) => {
    let msg = ''
    if (typeof title !== 'string' || title.length < 1) {
        msg = 'title参数有误;';
        return resultFuncs.resultObject(null, msg);
    }

    if (isNaN(price) || price < 0.1) {
        msg = 'price参数有误'
        return resultFuncs.resultObject(null, msg);
    }

    if (typeof tag !== 'string' || tag.length < 1) {
        msg = 'tag参数有误';
        return resultFuncs.resultObject(null, msg);
    }
    // let newSrcs = JSON.parse(srcs);
    // console.log(srcs)
    if (!Array.isArray(srcs) || srcs.length < 1) {
        msg = '图片数组参数有误';
        return resultFuncs.resultObject(null, msg);
    }
    if (originPrice) {
        if (isNaN(originPrice) || originPrice < price) {
            msg = '原价参数有误';
            return resultFuncs.resultObject(null, msg);
        }
    } else {
        originPrice = null;
    }
    let newSrcs = JSON.stringify(srcs);
    return resultFuncs.resultObject(await productDao.addData(title, price, newSrcs, tag, originPrice), '添加商品成功');
}

/**
 * 删除一条商品数据
 * @param {number} id 
 */
module.exports.removeData = async (id) => {
    if (isNaN(id) || id < 1) {
        return resultFuncs.resultObject(null, '产品id有误');
    }
    return resultFuncs.resultObject(await productDao.removeData(id), '产品删除成功')
}