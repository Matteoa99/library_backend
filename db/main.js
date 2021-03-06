const mysql = require("mysql");

const DB_CON = mysql.createPool({
    connectionLimit: 300,
    host: process.env.MYSQL_ADDRESS,
    user: process.env.MYSQL_DB_USER,
    password: process.env.MYSQL_DB_PASS,
    database: process.env.MYSQL_DB_NAME
});

module.exports = DB_CON;
