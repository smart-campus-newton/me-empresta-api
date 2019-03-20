const { Phone } = require('../models')

const PhoneService = {
    create,
    list
}

function create(payload) {
    const pLoad = Object.assign({}, payload)

    return new Promise((resolve, reject) => {
        try {
            Phone.create(pLoad).then((item) => {
                return resolve(item)
            }).catch((err) => {
                return reject(err)
            })
        } catch (ex) {
            console.log(`[phone/service.js] => [create] => ${ex}.`)
            return reject(ex)
        }
    })
}

function list() {
    return new Promise((resolve, reject) => {
        try {
            Phone.findAll().then((item) => {
                return resolve(item)
            }).catch((err) => {
                return reject(err)
            })
        } catch (ex) {
            console.log(`[phone/service.js] => [list] => ${ex}.`)
            return reject(ex)
        }
    })
}

module.exports = function factory() {
    return PhoneService
}
