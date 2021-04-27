const mysql2 = require('mysql2/promise');
let conn;
module.exports.create = async function () {
    if (!conn) {
        conn = await mysql2.createPool({
            host: 'localhost',
            password: 'root',
            user: 'root',
            database: 'small_routine',
            waitForConnections: true,
            connectionLimit: 10
        })
    }

    return conn;
}
module.exports.getConnection = async (host = 'localhost', user = "root", database = "small_routine") => {
    return await mysql2.createPool({
        host,
        password: 'root',
        user,
        database,
        waitForConnections: true,
        connectionLimit: 10
    })
}

module.exports.conn = conn;