const PHONE = require('./service')

const phoneService = PHONE()

const phoneServiceController = {
    list,
    create
}

function create(req, res) {
    const { body } = Object.assign({}, req)

    phoneService.create(body)
        .then(result =>
            res.status(201).send(result)
        ).catch((err) => {
            res.status(400).send({ service: 'phone', msg: err.message })
        })
}

function list(req, res) {
    phoneService.list()
        .then(result =>
            res.status(201).send(result)
        ).catch((err) => {
            res.status(400).send({ service: 'phone', msg: err.message })
        })
}

module.exports = function factory() {
    return phoneServiceController
}
