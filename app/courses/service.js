const { Courses } = require('../models')

const CourseService = {
    create,
    list
}

function create(payload) {
    const pLoad = Object.assign({}, payload)

    return new Promise((resolve, reject) => {
        try {
            Courses.create(pLoad).then((item) => {
                return resolve(item)
            }).catch((err) => {
                return reject(err)
            })
        } catch (ex) {
            console.log(`[course/service.js] => [create] => ${ex}.`)
            return reject(ex)
        }
    }) 
}

function list() {
    return new Promise((resolve, reject) => {
        try {
            Courses.findAll().then((item) => {
                return resolve(item)
            }).catch((err) => {
                return reject(err)
            })
        } catch (ex) {
            console.log(`[course/service.js] => [list] => ${ex}.`)
            return reject(ex)
        }
    })
}

module.exports = function factory() {
    return CourseService
}
