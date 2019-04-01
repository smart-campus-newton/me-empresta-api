const MongoAdapter = require('../adapter/mongo')
const codeGenerator = require('../codeGenerator')
const queryService = require('../query/service')
const mongoAdapter = MongoAdapter()

const create = (payload) => {
    console.log('[me-empresta-api] => [phone/service.js] => [create] => Creating phone.')

    return new Promise((resolve, reject) => {
        try {
            const phoneCollection = mongoAdapter.getState().collection('phone')
            const phone = Object.assign({}, payload)
            phone.code = codeGenerator.generate('ph')
            phone.status = 'active'
            phone.created = formatDateTime(new Date())

            phoneCollection.createIndex({ code: 1 }, { unique: true })

            return phoneCollection.insert(phone)
                .then(doc => resolve(doc.ops[0]))
                .catch((err) => {
                    console.log(`[me-empresta-api] => [phone/service.js] => [create] => ${err.message}`)
                    return reject(new InfrastructureError(err))
                })
        } catch (err) {
            console.log(`[me-empresta-api] => [phone/service.js] => [create] => ${err.message}`)
            return reject(err)
        }
    })
}

const list = () => {
    console.log('[me-empresta-api] => [phone/service.js] => [list] => Getting phone.')

    return new Promise((resolve, reject) => {
        try {
            const workedQuery = queryService.worker(query)

            if (!workedQuery.status) {
                workedQuery.status = 'active'
            }

            return mongoAdapter.getState().collection('phone')
                .find(workedQuery)
                .toArray((err, docs) => {
                    if (err) {
                        console.log(`[me-empresta-api] => [phone/service.js] => [list] => ${err.message}`)
                        return reject(new InfrastructureError(err))
                    }
                    return resolve(docs)
                })
        } catch (ex) {
            console.log(`[me-empresta-api] => [phone/service.js] => [list] => ${ex}.`)
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
