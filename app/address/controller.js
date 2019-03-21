const addressService = require('./service')

const create = (req, res) => {
    const { body } = Object.assign({}, req)

    addressService.create(body)
        .then(result =>
            res.status(201).send(result)
        ).catch((err) => {
            res.status(400).send({ service: 'address', msg: err.message })
        })
}

const list = (req, res) => {
    addressService.list()
        .then(result =>
            res.status(201).send(result)
        ).catch((err) => {
            res.status(400).send({ service: 'address', msg: err.message })
        })
}

module.exports = {
    create,
    list
}
