const { Users } = require('../models')

const userService = {
  create
}

function create (payload) {
  debugger;
  const pLoad = Object.assign({}, payload)

  return new Promise((resolve, reject) => {
    Users.create(pLoad).then((item) => {
      debugger;
      return resolve(item)
    }).catch((err) => {
      debugger;
      return reject(err)
    })
  })
}

module.exports = function factory () {
  return userService
}
