const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'mysql995.umbler.com',
    port: 41890,
    user: 'smart-campus',
    password: 'scn35085808',
    database: 'me-empresta'
});

module.exports = { connection };