const userService = require('./service')
const hal = require('./hal.js')

const login = ({ jwt, jwtSecret }) => (req, res) => {
  const { body } = Object.assign({}, req)

  userService.login(body)
    .then(result => {
      return hal.one(result).then(halResult => { 
        const token = jwt.sign(halResult, jwtSecret)
        res.status(200).send(token).end()
      })
    }).catch((err) => {
      res.status(400).send({ service: 'user', msg: err.message })
    })
}

const create = (req, res) => {
  const { body } = Object.assign({}, req)

  userService.create(body)
    .then(result =>
      res.status(201).send(result)
    ).catch((err) => {
      res.status(400).send({ service: 'user', msg: err.message })
    })
}

const edit = (req, res) => {
  const { params, body } = Object.assign({}, req)

  userService.edit(params.code, body)
    .then((result) => {
      if (!result) {
        return res.status(400).send({ service: 'users', msg: 'user code inválid.' }).end()
      }
      return hal.one(result)
        .then(halResult => res.status(200).send(halResult).end())
    })
    .catch((err) => {
      if (err instanceof BusinessError) {
        res.status(400).send({ service: 'users', msg: err.message }).end()
      }
      if (err instanceof InfrastructureError) {
        res.status(500).send({ service: 'users', msg: 'Server error.' }).end()
      }
    })
}

module.exports = {
  login,
  create,
  edit
}
