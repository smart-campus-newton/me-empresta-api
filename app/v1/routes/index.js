const objectsRoutes = require('./objects/objects_routes');
module.exports = function (app) {
    objectsRoutes(app);
};