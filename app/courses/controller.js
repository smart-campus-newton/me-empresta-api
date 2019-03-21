const courseService = require('./service')

const create = (req, res) => {
  const { body } = Object.assign({}, req)
  
  courseService.create(body)
    .then(result =>
        res.status(201).send(result)
    ).catch((err) => {
      res.status(400).send({ service: 'courses', msg: err.message })
    })
}

const list = (req, res) => {
  courseService.list()
    .then(result =>
        res.status(201).send(result)
    ).catch((err) => {
      res.status(400).send({ service: 'courses', msg: err.message })
    })
}

module.exports = {
  create,
  list
}
