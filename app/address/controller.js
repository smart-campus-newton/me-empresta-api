const ADDRESS = require('./service')

const addressService = ADDRESS()

const addressServiceController = {
    list,
    create
}

function create(req, res) {
    const { body } = Object.assign({}, req)

    addressService.create(body)
        .then(result =>
            res.status(201).send(result)
        ).catch((err) => {
            res.status(400).send({ service: 'address', msg: err.message })
        })
}

function list(req, res) {
    addressService.list()
        .then(result =>
            res.status(201).send(result)
        ).catch((err) => {
            res.status(400).send({ service: 'address', msg: err.message })
        })
}

module.exports = function factory() {
    return addressServiceController
}