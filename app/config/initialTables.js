function initialTables(conn) {

    const sql = "CREATE TABLE IF NOT EXISTS OBJECTS (\n" +
        "ID int NOT NULL AUTO_INCREMENT,\n" +
        "NAME varchar(500) NOT NULL,\n" +
        "PRIMARY KEY (ID)\n" +
        ");";

    conn.query(sql, function (error, results, fields) {
        if (error) return console.log(error);
        console.log('criou a tabela!');
    });
}

module.exports = { initialTables };
