const pool = require('./index');

/**
 * 分页查询动态
 * @param {number} page 
 * @param {number} size 
 */
module.exports.getData = async (page = 1, size = 10) => {
    let sql = `select * from dynamic order by \`id\` desc limit ?,?`;
    let conn = await pool.create();
    let [result] = await conn.execute(sql, [(page - 1) * size, size]);
    sql = `select count(*) as count from dynamic`;
    // conn = await pool.getConnection();
    let [count] = await conn.execute(sql, []);
    return {
        result,
        count: count[0].count
    }
}

/**
 * 添加一条动态
 * @param {string} content 
 * @param {string} ctime 
 */
module.exports.addData = async (content = '', ctime = (Date.now() + '')) => {
    let sql = `insert into dynamic(content,ctime) values(?,?)`;
    let conn = await pool.create();
    let [result] = await conn.execute(sql, [content, ctime]);
    return result;
}

/**
 * 删除一条动态
 * @param {number} id 
 */
module.exports.removeData = async (id) => {
    let sql = `delete from dynamic where id=?`;
    let conn = await pool.create();
    let [result] = await conn.execute(sql, [id]);
    return result;
}