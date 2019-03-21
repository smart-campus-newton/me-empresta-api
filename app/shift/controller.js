const shiftService = require('./service')

const create = (req, res) => {
    const { body } = Object.assign({}, req)

    shiftService.create(body)
        .then(result =>
            res.status(201).send(result)
        ).catch((err) => {
            res.status(400).send({ service: 'shift', msg: err.message })
        })
}

const list = (req, res) => {
    shiftService.list()
        .then(result =>
            res.status(201).send(result)
        ).catch((err) => {
            res.status(400).send({ service: 'shift', msg: err.message })
        })
}

module.exports = {
    create,
    list
}
