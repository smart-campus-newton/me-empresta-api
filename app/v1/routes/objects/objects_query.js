const execSQLQuery = require('../../../adapter/exec_query').execSQLQuery;

function getAll(res) {
    execSQLQuery('SELECT * FROM OBJECTS', res);
}

module.exports = { getAll }