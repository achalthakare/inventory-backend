const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createPool(process.env.MYSQL_URL);

module.exports = db;