const querys = require('./objects_query');

module.exports = function (app) {
    //----------GET----------------------------//
    app.get('/v1/public/objects', (req, res) => {
        querys.getAll(res);
    });
    app.get('/v1/public/objects/:objectId', (req, res) => {
        const id = req.params.objectId;
        querys.getById(id, res);
    });

    //----------PUT----------------------------//
    app.put('/v1/public/objects/:objectId', (req, res) => {
        const id = req.params.objectId;
        const object = req.body;
        querys.edit(id, object, res);
    });

    //----------POST---------------------------//
    app.post('/v1/public/objects', (req, res) => {
        const newobject = req.body;
        querys.create(newobject, res);
    });

    //----------DELETE-------------------------//
    app.delete('/v1/public/objects/:objectId', (req, res) => {
        const id = req.params.objectId;
        querys.deleteById(id, res);
    });
};