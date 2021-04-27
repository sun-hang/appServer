const { purge } = require('../web/api/tag');
const pool = require('./index');

/**
 * 根据分页和关键词进行查询商品
 * @param {number} page 
 * @param {number} size 
 * @param {string} query 
 */
module.exports.getData = async (page = 1, size = 5, query = "") => {
    let sql;
    let conn = await pool.create();
    console.log(query);
    if (query) {
        query = "%" + query + "%";
        sql = `select * from product where tag like ? or title like ? limit ?,?`;
        let [result] = await conn.execute(sql, [query, query, (page - 1) * size, size]);
        sql = `select count(*) as count from product where tag like ? or title like ?`;
        let [count] = await conn.execute(sql, [query, query]);
        return { count: count[0].count, result };
    } else {
        sql = `select * from product limit ?,?`;
        let [result] = await conn.execute(sql, [(page - 1) * size, size]);
        sql = `select count(*) as count from product`;
        let [count] = await conn.execute(sql, []);
        return { count: count[0].count, result };
    }
}

/**
 * 设置一条商品数据
 */
module.exports.setData = async (id, title, price, srcs, tag, originPrice) => {
    let sql = `update product set title=?, price=?,srcs=?,tag=?,originPrice=? where id=?`;
    let conn = await pool.create();
    let [result] = await conn.execute(sql, [title, price, srcs, tag, originPrice, id]);
    return result;
}

/**
 * 添加一条商品数据
 */
module.exports.addData = async (title, price, srcs, tag, originPrice) => {
    let sql = `insert into product(title,price,originPrice,srcs,tag) values(?,?,?,?,?)`;
    let conn = await pool.create();
    let [result] = await conn.execute(sql, [title, price, originPrice, srcs, tag]);
    return result;
}

/**
 * 删除一条商品数据
 */
module.exports.removeData = async (id) => {
    let sql = `delete from product where id=?`;
    let conn = await pool.create();
    let [result] = await conn.execute(sql, [id]);
    return result;
}
