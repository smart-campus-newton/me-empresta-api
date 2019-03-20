const { Address } = require('../models')

const AddressService = {
    create,
    list
}

function create(payload) {
    const pLoad = Object.assign({}, payload)

    return new Promise((resolve, reject) => {
        try {
            Address.create(pLoad).then((item) => {
                return resolve(item)
            }).catch((err) => {
                return reject(err)
            })
        } catch (ex) {
            console.log(`[address/service.js] => [create] => ${ex}.`)
            return reject(ex)
        }
    })
}

function list() {
    return new Promise((resolve, reject) => {
        try {
            Address.findAll().then((item) => {
                return resolve(item)
            }).catch((err) => {
                return reject(err)
            })
        } catch (ex) {
            console.log(`[address/service.js] => [list] => ${ex}.`)
            return reject(ex)
        }
    })
}

module.exports = function factory() {
    return AddressService
}
