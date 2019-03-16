const { Users } = require('../models')

const userService = {
  create
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

module.exports = function factory () {
  return userService
}
