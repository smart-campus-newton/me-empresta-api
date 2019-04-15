const MongoAdapter = require('../adapter/mongo')
const codeGenerator = require('../codeGenerator')
const queryService = require('../query/service')
const mongoAdapter = MongoAdapter()

const create = (payload) => {
    console.log('[me-empresta-api] => [loan/service.js] => [create] => Creating course.')

    return new Promise((resolve, reject) => {
        try {
            const loanCollection = mongoAdapter.getState().collection('loan')
            const loan = Object.assign({}, payload)
            loan.code = codeGenerator.generate('co')
            loan.status = 'active'
            loan.created = formatDateTime(new Date())

            loanCollection.createIndex({ code: 1 }, { unique: true })

            return loanCollection.insert(loan)
                .then(doc => resolve(doc.ops[0]))
                .catch((err) => {
                    console.log(`[me-empresta-api] => [loan/service.js] => [create] => ${err.message}`)
                    return reject(err)
                })
        } catch (err) {
            console.log(`[me-empresta-api] => [loan/service.js] => [create] => ${err.message}`)
            return reject(err)
        }
    })
}

const list = (query) => {
    console.log('[me-empresta-api] => [loan/service.js] => [list] => Getting loan.')

    return new Promise((resolve, reject) => {
        try {
            const workedQuery = queryService.worker(query)

            if (!workedQuery.status) {
                workedQuery.status = 'active'
            }

            return mongoAdapter.getState().collection('loan')
                .find(workedQuery)
                .toArray((err, docs) => {
                    if (err) {
                        console.log(`[me-empresta-api] => [loan/service.js] => [list] => ${err.message}`)
                        return reject(err)
                    }
                    return resolve(docs)
                })
        } catch (ex) {
            console.log(`[me-empresta-api] => [loan/service.js] => [list] => ${ex}.`)
            return reject(ex)
        }
    })
}

const one = (query) => {
    console.log('[me-empresta-api] => [loan/service.js] => [one] => Getting one course by query.')

    return new Promise((resolve, reject) => {
        try {
            if (!query) {
                throw new Error('Empty query.')
            }
            const workedQuery = Object.assign({}, query)

            if (!workedQuery.status) {
                workedQuery.status = 'active'
            }

            return mongoAdapter.getState().collection('loan')
                .findOne(workedQuery, (err, doc) => {
                    if (err) {
                        console.log(`[me-empresta-api] => [loan/service.js] => [one] => ${err.message}`)
                        return reject(err)
                    }
                    return resolve(doc)
                })
        } catch (err) {
            console.log(`[me-empresta-api] => [loan/service.js] => [one] => ${ex}.`)
            return reject(err)
        }
    })
}

const edit = (code, payload) => {
    console.log('[me-empresta-api] => [loan/service.js] => [edit] => Editing loan.')

    return new Promise((resolve, reject) => {
        try {
            const pLoad = Object.assign({}, payload)
            delete pLoad.code

            return mongoAdapter.getState().collection('loan')
                .findOneAndUpdate({ code }, { $set: pLoad }, { returnOriginal: false }, (err, doc) => {
                    if (err) {
                        console.log(`[me-empresta-api] => [loan/service.js] => [edit] => ${err.message}`)
                        return reject(err.message)
                    }
                    return resolve(doc.value)
                })
        } catch (err) {
            console.log(`[me-empresta-api] => [loan/service.js] => [edit] => ${err.message}`)
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
