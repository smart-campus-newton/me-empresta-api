const { Courses } = require('../models')

const CourseService = {
    list
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
