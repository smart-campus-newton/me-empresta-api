const { UserStatus } = require('../models')

const StatusService = {
    create,
    list
}

function create(payload) {
    const pLoad = Object.assign({}, payload)

    return new Promise((resolve, reject) => {
        try {
            UserStatus.create(pLoad).then((item) => {
                return resolve(item)
            }).catch((err) => {
                return reject(err)
            })
        } catch (ex) {
            console.log(`[status/service.js] => [create] => ${ex}.`)
            return reject(ex)
        }
    })
}

function list() {
    return new Promise((resolve, reject) => {
        try {
            UserStatus.findAll().then((item) => {
                return resolve(item)
            }).catch((err) => {
                return reject(err)
            })
        } catch (ex) {
            console.log(`[status/service.js] => [list] => ${ex}.`)
            return reject(ex)
        }
    })
}

module.exports = function factory() {
    return StatusService
}
