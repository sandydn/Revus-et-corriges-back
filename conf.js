const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '5b6ir8ps§',
    database: 'chodaragenda'
})

module.exports = connection;