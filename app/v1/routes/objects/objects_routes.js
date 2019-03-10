const querys = require('./objects_query');

module.exports = function (app) {
    //----------GET----------------------------//
    app.get('/v1/public/objects', (req, res) => {
        querys.getAll(res);
    });
    app.get('/v1/public/objects/:objectId', (req, res) => {
        const id = req.params.objectId;
        res.send({ 'error': 'An error has occurred' });
    });
    app.get('/v1/public/objects/:objectId/scores', (req, res) => {
        const id = req.params.objectId;
        res.send({ 'error': 'An error has occurred' });
    });

    //----------PUT----------------------------//
    app.put('/v1/public/objects/:objectId', (req, res) => {
        const id = req.params.objectId;
        const object = req.body.object;
        res.send({ 'error': 'An error has occurred' });
    });
    app.put('/v1/public/objects/:objectId/scores/:scoreId', (req, res) => {
        const objectId = req.params.objectId;
        const scoreId = req.params.scoreId;
        const scoreEdited = req.params.scores;

        res.send({ 'error': 'An error has occurred' });
    });

    //----------POST---------------------------//
    app.post('/v1/public/objects', (req, res) => {
        const newobject = req.body.object;
        res.send({ 'error': 'An error has occurred' });
    });
    app.post('/v1/public/objects/:objectId/scores', (req, res) => {
        const scoreId = req.params.scoreId;
        const newScore = req.body.score;
        res.send({ 'error': 'An error has occurred' });
    });
    
    //----------DELETE-------------------------//
    app.delete('/v1/public/objects/:objectId', (req, res) => {
        const id = req.params.objectId;
        res.send({ 'error': 'An error has occurred' });
    });
};