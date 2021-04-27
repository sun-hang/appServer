const tagDao = require('../dao/tag');
const resultFuns = require('../utils/resultData')
/**
 * 获取所有标签
 */
module.exports.getData = async () => {
    return resultFuns.resultObject(await tagDao.getData(), '获取所有标签成功');
}

/**
 * 获取单个标签，查看是否存在
 */
module.exports.getOne = async (tag = '') => {
    if (!tag || typeof tag !== 'string') {
        return resultFuns.resultObject(null, 'tag参数为空')
    }
    return resultFuns.resultObject(await tagDao.getOneData(tag), '查询成功')
}

/**
 * 
 * @param {string} tag 
 */
module.exports.addData = async (tag = "") => {
    if (!tag || typeof tag !== 'string') {
        return resultFuns.resultObject(null, 'tag参数为空')
    }
    return resultFuns.resultObject(await tagDao.addData(tag), '添加标签成功')
}

/**
 * 
 * @param {number} id 
 */
module.exports.removeData = async (id) => {
    if (isNaN(id) || id < 1) {
        return resultFuns.resultObject(null, '参数id错误');
    }
    return resultFuns.resultObject(await tagDao.removeData(id),'删除标签成功');
}