const { json } = require('express');
// Load module
var mysql = require('mysql');
// Initialize pool
var pool = mysql.createPool({
    connectionLimit: DATABASE_SQL_POOL,
    host: process.env.DATABASE_SQL_HOST,
    user: process.env.DATABASE_SQL_USER,
    password: process.env.DATABASE_SQL_PASSWORD,
    database: process.env.DATABASE_SQL_DATABASE
});
module.exports = pool;