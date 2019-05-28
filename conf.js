const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'try again man',
    database: 'calendar'
});

module.exports = connection;
