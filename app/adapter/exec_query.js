const connection = require('../config/db').connection;

function execSQLQuery(sqlQry, res) {
    connection.query(sqlQry, function (error, results, fields) {
        if (error)
            res.send(error);
        else
            res.send(results);
        console.log('executou!');
    });
}

module.exports = { execSQLQuery }