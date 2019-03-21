const { Phone } = require('../models')

const create = (payload) => {
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

const list = () => {
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

module.exports = {
    create,
    list
}
