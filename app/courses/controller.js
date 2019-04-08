const courseService = require('./service')
const hal = require('./hal.js')

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

const edit = (req, res) => {
  const { params, body } = Object.assign({}, req)

  courseService.edit(params.code, body)
    .then((result) => {
      if (!result) {
        return res.status(400).send({ service: 'courses', msg: 'course code inválid.' }).end()
      }
      return hal.one(result)
        .then(halResult => res.status(200).send(halResult).end())
    })
    .catch((err) => {
      if (err instanceof BusinessError) {
        res.status(400).send({ service: 'courses', msg: err.message }).end()
      }
      if (err instanceof InfrastructureError) {
        res.status(500).send({ service: 'courses', msg: 'Server error.' }).end()
      }
    })
}

module.exports = {
  create,
  list,
  edit
}
