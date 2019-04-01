const MongoAdapter = require('../adapter/mongo')
const codeGenerator = require('../codeGenerator')
const queryService = require('../query/service')
const mongoAdapter = MongoAdapter()

const create = (payload) => {
    console.log('[me-empresta-api] => [status/service.js] => [create] => Creating status.')

    return new Promise((resolve, reject) => {
        try {
            const statusCollection = mongoAdapter.getState().collection('status')
            const status = Object.assign({}, payload)
            status.code = codeGenerator.generate('st')
            status.status = 'active'
            status.created = formatDateTime(new Date())

            statusCollection.createIndex({ code: 1 }, { unique: true })

            return statusCollection.insert(status)
                .then(doc => resolve(doc.ops[0]))
                .catch((err) => {
                    console.log(`[me-empresta-api] => [status/service.js] => [create] => ${err.message}`)
                    return reject(new InfrastructureError(err))
                })
        } catch (err) {
            console.log(`[me-empresta-api] => [status/service.js] => [create] => ${err.message}`)
            return reject(err)
        }
    })
}

const list = () => {
    console.log('[me-empresta-api] => [status/service.js] => [list] => Getting status.')

    return new Promise((resolve, reject) => {
        try {
            const workedQuery = queryService.worker(query)

            if (!workedQuery.status) {
                workedQuery.status = 'active'
            }

            return mongoAdapter.getState().collection('status')
                .find(workedQuery)
                .toArray((err, docs) => {
                    if (err) {
                        console.log(`[me-empresta-api] => [status/service.js] => [list] => ${err.message}`)
                        return reject(new InfrastructureError(err))
                    }
                    return resolve(docs)
                })
        } catch (ex) {
            console.log(`[me-empresta-api] => [status/service.js] => [list] => ${ex}.`)
            return reject(ex)
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
    list
}
