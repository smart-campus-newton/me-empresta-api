const phoneService = require('./service')

const create = (req, res) => {
    const { body } = Object.assign({}, req)

    phoneService.create(body)
        .then(result =>
            res.status(201).send(result)
        ).catch((err) => {
            res.status(400).send({ service: 'phone', msg: err.message })
        })
}

const list = (req, res) => {
    phoneService.list()
        .then(result =>
            res.status(201).send(result)
        ).catch((err) => {
            res.status(400).send({ service: 'phone', msg: err.message })
        })
}

module.exports = {
    create,
    list
}
