const objectsRoutes = require('./objects_routes');
module.exports = function (app, db) {
    objectsRoutes(app, db);
};