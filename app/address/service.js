const MongoAdapter = require('../adapter/mongo')
const codeGenerator = require('../codeGenerator')
const queryService = require('../query/service')
const mongoAdapter = MongoAdapter()

const create = (payload) => {
    console.log('[me-empresta-api] => [address/service.js] => [create] => Creating address.')

    return new Promise((resolve, reject) => {
        try {
            const addressCollection = mongoAdapter.getState().collection('address')
            const address = Object.assign({}, payload)
            address.code = codeGenerator.generate('ad')
            address.status = 'active'
            address.created = formatDateTime(new Date())

            addressCollection.createIndex({ code: 1 }, { unique: true })

            return addressCollection.insert(address)
                .then(doc => resolve(doc.ops[0]))
                .catch((err) => {
                    console.log(`[me-empresta-api] => [address/service.js] => [create] => ${err.message}`)
                    return reject(new InfrastructureError(err))
                })
        } catch (err) {
            console.log(`[me-empresta-api] => [address/service.js] => [create] => ${err.message}`)
            return reject(err)
        }
    })
}

const list = () => {
    console.log('[me-empresta-api] => [address/service.js] => [list] => Getting address.')

    return new Promise((resolve, reject) => {
        try {
            const workedQuery = queryService.worker(query)

            if (!workedQuery.status) {
                workedQuery.status = 'active'
            }

            return mongoAdapter.getState().collection('address')
                .find(workedQuery)
                .toArray((err, docs) => {
                    if (err) {
                        console.log(`[me-empresta-api] => [address/service.js] => [list] => ${err.message}`)
                        return reject(new InfrastructureError(err))
                    }
                    return resolve(docs)
                })
        } catch (ex) {
            console.log(`[me-empresta-api] => [address/service.js] => [list] => ${ex}.`)
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
