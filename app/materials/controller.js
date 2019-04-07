const materialService = require('./service')

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

module.exports = {
  create,
  list
}
