const MongoAdapter = require('../adapter/mongo')
const codeGenerator = require('../codeGenerator')
const queryService = require('../query/service')
const mongoAdapter = MongoAdapter()

const create = (payload) => {
    console.log('[me-empresta-api] => [courses/service.js] => [create] => Creating course.')

    return new Promise((resolve, reject) => {
        try {
            const coursesCollection = mongoAdapter.getState().collection('courses')
            const courses = Object.assign({}, payload)
            courses.code = codeGenerator.generate('co')
            courses.status = 'active'
            courses.created = formatDateTime(new Date())

            coursesCollection.createIndex({ code: 1 }, { unique: true })

            return coursesCollection.insert(courses)
                .then(doc => resolve(doc.ops[0]))
                .catch((err) => {
                    console.log(`[me-empresta-api] => [courses/service.js] => [create] => ${err.message}`)
                    return reject(new InfrastructureError(err))
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
                        return reject(new InfrastructureError(err))
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
                throw new BusinessError('Empty query.');
            }
            const workedQuery = Object.assign({}, query);

            if (!workedQuery.status) {
                workedQuery.status = 'active';
            }

            return mongoAdapter.getState().collection('courses')
                .findOne(workedQuery, (err, doc) => {
                    if (err) {
                        console.log(`[me-empresta-api] => [courses/service.js] => [one] => ${err.message}`)
                        return reject(new InfrastructureError(err));
                    }
                    return resolve(doc);
                });
        } catch (err) {
            console.log(`[me-empresta-api] => [courses/service.js] => [one] => ${ex}.`)
            return reject(err);
        }
    });
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
    one
}
