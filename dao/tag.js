const pool = require('./index');

/**
 * 获取所有标签
 */
module.exports.getData = async () => {
    let sql = `select * from tags`;
    let conn = await pool.create();
    let [result] = await conn.execute(sql, []);
    return result;
}

module.exports.getOneData = async (tag = '') => {
    let sql = `select * from tags where tag=?`;
    let conn = await pool.create();
    let [result] = await conn.execute(sql, [tag]);
    return result;
}

/**
 * 添加一条标签
 * @param {string} tag 
 */
module.exports.addData = async (tag = "") => {
    let sql = `insert into tags(tag) values(?)`;
    let conn = await pool.create();
    let [result] = await conn.execute(sql, [tag]);
    return result;
}

/**
 * 删除一条数据
 * @param {number} id 
 */
module.exports.removeData = async (id) => {
    let sql = `delete from tags where id=?`;
    let conn = await pool.create();
    let [result] = await conn.execute(sql, [id]);
    return result;
}