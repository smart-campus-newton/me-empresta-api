const USER = require('./service')

const userService = USER()

const userServiceController = {
  create,
  login
}

function create (req, res) {
  const { body } = Object.assign({}, req)

  userService.create(body)
    .then(result =>
        res.status(201).send(result)
    ).catch((err) => {
      res.status(400).send({ service: 'user', msg: err.message })
    })
}

function login (req, res) {
  const { body } = Object.assign({}, req)

  userService.login(body)
    .then(result =>
        res.status(201).send(result)
    ).catch((err) => {
      res.status(400).send({ service: 'user', msg: err.message })
    })
}

module.exports = function factory () {
  return userServiceController
}
