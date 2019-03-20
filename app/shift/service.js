const { Shift } = require('../models')

const ShiftService = {
    create,
    list
}

function create(payload) {
    const pLoad = Object.assign({}, payload)

    return new Promise((resolve, reject) => {
        try {
            Shift.create(pLoad).then((item) => {
                return resolve(item)
            }).catch((err) => {
                return reject(err)
            })
        } catch (ex) {
            console.log(`[shift/service.js] => [create] => ${ex}.`)
            return reject(ex)
        }
    })
}

function list() {
    return new Promise((resolve, reject) => {
        try {
            Shift.findAll().then((item) => {
                return resolve(item)
            }).catch((err) => {
                return reject(err)
            })
        } catch (ex) {
            console.log(`[shift/service.js] => [list] => ${ex}.`)
            return reject(ex)
        }
    })
}

module.exports = function factory() {
    return ShiftService
}
