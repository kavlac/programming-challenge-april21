const mysql = require('mysql');
const { db } = require('../../config');

const poolConnection = mysql.createPool({
    host: db.host,
    port:3306,
    user:db.user,
    password: db.password,
    database: db.database,
    charset: 'UTF8_GENERAL_CI',
    multipleStatements: true,
    connectionLimit: 10000
});

module.exports = poolConnection;