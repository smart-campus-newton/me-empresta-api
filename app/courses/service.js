const MongoAdapter = require('../adapter/mongo')
const codeGenerator = require('../codeGenerator')
const queryService = require('../query/service')
const schema = require('./schema')
const Validator = require('jsonschema').Validator
const v = new Validator()
const mongoAdapter = MongoAdapter()

const create = (payload) => {
    console.log('[me-empresta-api] => [courses/service.js] => [create] => Creating course.')

    return new Promise((resolve, reject) => {
        try {
            const valid = v.validate(payload, schema)
            const coursesCollection = mongoAdapter.getState().collection('courses')
            const courses = Object.assign({}, payload)
            courses.code = codeGenerator.generate('co')
            courses.status = 'active'
            courses.created = formatDateTime(new Date())

            coursesCollection.createIndex({ code: 1 }, { unique: true })

            if (!!valid.errors) {
                throw new Error(valid.errors[0].stack);
            }

            return coursesCollection.insert(courses)
                .then(doc => resolve(doc.ops[0]))
                .catch((err) => {
                    console.log(`[me-empresta-api] => [courses/service.js] => [create] => ${err.message}`)
                    return reject(err)
                })
        } catch (err) {
            console.log(`[me-empresta-api] => [courses/service.js] => [create] => ${err.message}`)
            return reject(err)
        }
    })
}

const list = (query) => {
    console.log('[me-empresta-api] => [courses/service.js] => [list] => Getting courses.')

    return new Promise((resolve, reject) => {
        try {
            const workedQuery = queryService.worker(query)

            if (!workedQuery.status) {
                workedQuery.status = 'active'
            }

            return mongoAdapter.getState().collection('courses')
                .find(workedQuery)
                .toArray((err, docs) => {
                    if (err) {
                        console.log(`[me-empresta-api] => [courses/service.js] => [list] => ${err.message}`)
                        return reject(err)
                    }
                    return resolve(docs)
                })
        } catch (ex) {
            console.log(`[me-empresta-api] => [courses/service.js] => [list] => ${ex}.`)
            return reject(ex)
        }
    })
}

const one = (query) => {
    console.log('[me-empresta-api] => [courses/service.js] => [one] => Getting one course by query.')

    return new Promise((resolve, reject) => {
        try {
            if (!query) {
                throw new Error('Empty query.')
            }
            const workedQuery = Object.assign({}, query)

            if (!workedQuery.status) {
                workedQuery.status = 'active'
            }

            return mongoAdapter.getState().collection('courses')
                .findOne(workedQuery, (err, doc) => {
                    if (err) {
                        console.log(`[me-empresta-api] => [courses/service.js] => [one] => ${err.message}`)
                        return reject(err)
                    }
                    return resolve(doc)
                })
        } catch (err) {
            console.log(`[me-empresta-api] => [courses/service.js] => [one] => ${ex}.`)
            return reject(err)
        }
    })
}

const edit = (code, payload) => {
    console.log('[me-empresta-api] => [courses/service.js] => [edit] => Editing courses.')

    return new Promise((resolve, reject) => {
        try {
            const pLoad = Object.assign({}, payload)
            delete pLoad.code

            const valid = v.validate(pLoad, schema)

            if (!!valid.errors) {
                throw new Error(valid.errors[0].stack);
            }

            return mongoAdapter.getState().collection('courses')
                .findOneAndUpdate({ code }, { $set: pLoad }, { returnOriginal: false }, (err, doc) => {
                    if (err) {
                        console.log(`[me-empresta-api] => [courses/service.js] => [edit] => ${err.message}`)
                        return reject(err.message)
                    }
                    return resolve(doc.value)
                })
        } catch (err) {
            console.log(`[me-empresta-api] => [courses/service.js] => [edit] => ${err.message}`)
            return reject(err)
        }
    })
}

const formatDateTime = (date) => {
    try {
        if (date) {
            return new Date(new Date(date).toISOString())
        }
        return null
    } catch (err) {
        return null
    }
}

module.exports = {
    create,
    list,
    one,
    edit
}
