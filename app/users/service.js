const { Users, Address, Phone } = require('../models')

const userService = {
  create,
  login
}

function create (payload) {
  const pLoad = Object.assign({}, payload)
  const { address, phone } = pLoad

  return new Promise((resolve, reject) => {
    Address
      .create(address)
      .then((addressItem) => {
        pLoad.address_id = addressItem.dataValues.id

        Phone.create(phone).then((phoneItem) => {
          pLoad.phone_id = phoneItem.dataValues.id

          Users.create(pLoad).then((item) => {
            return resolve(item)
          }).catch((err) => {
            return reject(err)
          })
        })
      })
  })
}

function login(payload, jwt, jwtSecret) {
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
              const token = jwt.sign(item[0].dataValues, jwtSecret)
              return resolve(token)
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
