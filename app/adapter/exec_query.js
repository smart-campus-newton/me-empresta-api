const connection = require('../config/db').connection;
const response = require('./response_query').response;

function execSQLQuery(sqlQry, res, status) {
    connection.query(sqlQry, function (error, results, fields) {
        let result = {};
        if (error) {
            result.success = false;
            result.data = error;
        }
        else {
            result.success = true;
            result.data = results;
        }

        response(status, result, res);
    });
}

module.exports = { execSQLQuery }