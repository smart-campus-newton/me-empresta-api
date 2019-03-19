const { Users } = require('../models')

const userService = {
  create,
  login
}

function create (payload) {
  const pLoad = Object.assign({}, payload)

  return new Promise((resolve, reject) => {
    Users.create(pLoad).then((item) => {
      return resolve(item)
    }).catch((err) => {
      return reject(err)
    })
  })
}

function login(payload) {
  const pLoad = Object.assign({}, payload)
  const { email, password } = pLoad

  return new Promise((resolve, reject) => {
      try {
          Users.findAll({
            where: {
              email,
              password
            }
          }).then((item) => {
              return resolve(item)
          }).catch((err) => {
              return reject(err)
          })
      } catch (ex) {
          console.log(`[users/service.js] => [login] => ${ex}.`)
          return reject(ex)
      }
  })
}

module.exports = function factory () {
  return userService
}
