const execSQLQuery = require('../../../adapter/exec_query').execSQLQuery;

function getAll(res) {
    const expectedStatus = 200;

    execSQLQuery('SELECT * FROM OBJECTS', res, expectedStatus);
}

function getById(id, res) {
    const expectedStatus = 200;

    execSQLQuery(`SELECT * FROM OBJECTS WHERE ID = ${parseInt(id)} LIMIT 1`, res, expectedStatus);
}

function create(object, res) {
    const { name } = object;
    const expectedStatus = 201;

    execSQLQuery(`INSERT INTO OBJECTS(NAME) VALUES('${name}')`, res, expectedStatus);
}

function edit(id, object, res) {
    const { name } = object;
    const expectedStatus = 202;

    execSQLQuery(`UPDATE OBJECTS SET NAME='${name}' WHERE ID=${id}`, res, expectedStatus);
}

function deleteById(id, res) {
    const expectedStatus = 202;

    execSQLQuery(`DELETE FROM OBJECTS WHERE ID = ${parseInt(id)}`, res, expectedStatus);
}

module.exports = { getAll, getById, deleteById, create, edit }