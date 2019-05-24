const mysql = require('mysql');
const connexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '5b6ir8ps§',
    database: 'calendar'
});

module.exports = connexion;
