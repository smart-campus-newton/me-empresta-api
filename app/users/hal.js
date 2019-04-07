const courses = require('../courses/service')

const one = (item) => {
    return new Promise((resolve, reject) => {
        courses.one({ code: item.course_id })
            .then((result) => {
                try {
                    resolve(makeHal(item, result))
                } catch (err) {
                    reject(err)
                }
            })
    })
}

const makeHal = (item, result) => {
    return {
        _links: {
            self: { href: `/api/users/${item.code}` }
        },
        code: item.code,
        name: item.name,
        shift_id: item.shift_id,
        password: item.password,
        ra: item.ra,
        phone: item.phone,
        address: item.address,
        status: item.status,
        _embedded: {
            courses: result
        }
    }
}

module.exports = {
    one
}
