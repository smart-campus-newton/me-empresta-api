function response(status, result, res) {
    if (result.success) {
        const isAnArray = result.data.length > 1;
        const isAnObject = result.data.length == 1;
        const createOrUpdateObject = (status == 201 || status == 202) && result.data.affectedRows && result.data.affectedRows > 0;

        if (isAnArray)
            res.status(status).send(result.data).end();
        else if (isAnObject)
            res.status(status).send(result.data[0]).end();
        else if (createOrUpdateObject)
            res.status(status).send({}).end();
        else
            res.status(404).send({}).end();
    }
    else
        res.status(500).send(result.data).end();
}

module.exports = { response }