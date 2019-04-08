const materialService = require('./service')
const hal = require('./hal.js')

const create = (req, res) => {
  const { body } = Object.assign({}, req)

  materialService.create(body)
    .then(result =>
      res.status(201).send(result)
    ).catch((err) => {
      res.status(400).send({ service: 'materials', msg: err.message })
    })
}

const list = (req, res) => {
  materialService.list()
    .then(result =>
      res.status(201).send(result)
    ).catch((err) => {
      res.status(400).send({ service: 'materials', msg: err.message })
    })
}

const edit = (req, res) => {
  const { params, body } = Object.assign({}, req)

  materialService.edit(params.code, body)
    .then((result) => {
      if (!result) {
        return res.status(400).send({ service: 'materials', msg: 'material code inválid.' }).end()
      }
      return hal.one(result)
        .then(halResult => res.status(200).send(halResult).end())
    })
    .catch((err) => {
      res.status(400).send({ service: 'materials', msg: err.message }).end()
    })
}

module.exports = {
  create,
  list,
  edit
}
