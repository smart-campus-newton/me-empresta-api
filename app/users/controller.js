const USER = require('./service')

const userService = USER()

const userServiceController = {
  create
}

function create (req, res) {
  debugger;
  const { body } = Object.assign({}, req)

  userService.create(body)
    .then(result =>
        res.status(201).send(result)
    ).catch((err) => {
      res.status(400).send({ service: 'user', msg: err.message })
    })
}

module.exports = function factory () {
  return userServiceController
}
