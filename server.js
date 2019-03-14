// server.js
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./app/v1/routes');
const connection = require('./app/config/db').connection;
const initialTables = require('./app/config/initialTables').initialTables;
const app = express();

//swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

connection.connect(function (err) {
    if (err) return console.log(err);

    console.log('we have database !');
    initialTables(connection);

    routes(app);
    app.listen(port, () => {
        console.log('We are live on ' + port);
    });
});