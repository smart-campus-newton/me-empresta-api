// server.js
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./app/v1/routes');
const connection = require('./app/config/db').connection;
const initialTables = require('./app/config/initialTables').initialTables;
const app = express();

const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: true }));

connection.connect(function (err) {
    if (err) return console.log(err);

    console.log('we have database !');
    initialTables(connection);

    routes(app);
    app.listen(port, () => {
        console.log('We are live on ' + port);
    });
});