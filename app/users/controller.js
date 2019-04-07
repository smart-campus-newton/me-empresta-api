const userService = require('./service')
const hal = require('./hal.js');

const login = ({ jwt, jwtSecret }) => (req, res) => {
  const { body } = Object.assign({}, req)

  userService.login(body)
    .then(result => {
      return hal.one(result).then(halResult => { 
        const token = jwt.sign(halResult, jwtSecret)
        res.status(200).send(token).end()
      });
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

module.exports = {
  login,
  create
}
