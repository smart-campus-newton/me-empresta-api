const MongoAdapter = require('../adapter/mongo')
const codeGenerator = require('../codeGenerator')
const queryService = require('../query/service')
const mongoAdapter = MongoAdapter()

const create = (payload) => {
    console.log('[me-empresta-api] => [shift/service.js] => [create] => Creating shift.')

    return new Promise((resolve, reject) => {
        try {
            const shiftCollection = mongoAdapter.getState().collection('shift')
            const shift = Object.assign({}, payload)
            shift.code = codeGenerator.generate('sh')
            shift.status = 'active'
            shift.created = formatDateTime(new Date())

            shiftCollection.createIndex({ code: 1 }, { unique: true })

            return shiftCollection.insert(shift)
                .then(doc => resolve(doc.ops[0]))
                .catch((err) => {
                    console.log(`[me-empresta-api] => [shift/service.js] => [create] => ${err.message}`)
                    return reject(new InfrastructureError(err))
                })
        } catch (err) {
            console.log(`[me-empresta-api] => [shift/service.js] => [create] => ${err.message}`)
            return reject(err)
        }
    })
}

const list = () => {
    console.log('[me-empresta-api] => [shift/service.js] => [list] => Getting shift.')

    return new Promise((resolve, reject) => {
        try {
            const workedQuery = queryService.worker(query)

            if (!workedQuery.status) {
                workedQuery.status = 'active'
            }

            return mongoAdapter.getState().collection('shift')
                .find(workedQuery)
                .toArray((err, docs) => {
                    if (err) {
                        console.log(`[me-empresta-api] => [shift/service.js] => [list] => ${err.message}`)
                        return reject(new InfrastructureError(err))
                    }
                    return resolve(docs)
                })
        } catch (ex) {
            console.log(`[me-empresta-api] => [shift/service.js] => [list] => ${ex}.`)
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
