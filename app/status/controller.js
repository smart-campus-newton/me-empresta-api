const STATUS = require('./service')

const statusService = STATUS()

const statusServiceController = {
    list,
    create
}

function create(req, res) {
    const { body } = Object.assign({}, req)

    statusService.create(body)
        .then(result =>
            res.status(201).send(result)
        ).catch((err) => {
            res.status(400).send({ service: 'status', msg: err.message })
        })
}

function list(req, res) {
    statusService.list()
        .then(result =>
            res.status(201).send(result)
        ).catch((err) => {
            res.status(400).send({ service: 'status', msg: err.message })
        })
}

module.exports = function factory() {
    return statusServiceController
}
