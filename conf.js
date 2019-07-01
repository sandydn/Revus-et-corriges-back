const mysql = require('mysql');

// Protect DB with .env //

console.log(process.cwd())

require('dotenv').config(process.cwd(), '.env')

console.log(process.env.DB_USER);

const connection = mysql.createConnection({
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_DB,
});

module.exports = connection;