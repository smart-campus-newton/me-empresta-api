const userService = require('./service')

const login = ({ jwt, jwtSecret }) => (req, res) => {
  const { body } = Object.assign({}, req)

  userService.login(body, jwt, jwtSecret)
    .then(result =>
      res.status(201).send(result)
    ).catch((err) => {
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

module.exports = {
  login,
  create
}
