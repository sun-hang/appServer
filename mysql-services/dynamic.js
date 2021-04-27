const dynamicDao = require('../dao/dynamic')
const resultFuncs = require('../utils/resultData');
/**
 * 分页获取动态
 * @param {number} page 
 * @param {number} size 
 */
module.exports.getData = async (page = 1, size = 10) => {
    if (isNaN(page) || isNaN(size)) {
        return { count: 0, result: [] }
    }
    let result = await dynamicDao.getData(page, size);
    return resultFuncs.resultObject(result, '查询成功');
}

/**
 * 添加一条动态
 * @param {string} content 
 * @param {string} ctime 
 */
module.exports.addData = async (content = "", ctime = (Date.now() + '')) => {
    if (typeof content !== 'string' || content.length < 1 || isNaN(ctime) || +ctime > (Date.now())) {
        return resultFuncs.resultObject(0, '参数有误');
    }
    let result = await dynamicDao.addData(content, ctime);
    return resultFuncs.resultObject(result, '添加成功');
}

module.exports.removeData = async (id) => {
    if (isNaN(id)) {
        return resultFuncs.resultObject(0, '参数错误，id为数字');
    }

    let result = await dynamicDao.removeData(id);
    return resultFuncs.resultObject(result, '删除成功');
}
