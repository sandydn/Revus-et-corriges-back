const mysql = require('mysql');

// Protect DB with .env //
require('dotenv').config()

const connection = mysql.createConnection({
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

module.exports = connection;