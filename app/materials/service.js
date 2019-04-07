const MongoAdapter = require('../adapter/mongo')
const codeGenerator = require('../codeGenerator')
const queryService = require('../query/service')
const mongoAdapter = MongoAdapter()

const create = (payload) => {
    console.log('[me-empresta-api] => [materials/service.js] => [create] => Creating materials.')

    return new Promise((resolve, reject) => {
        try {
            const materialsCollection = mongoAdapter.getState().collection('materials')
            const materials = Object.assign({}, payload)
            materials.code = codeGenerator.generate('co')
            materials.status = 'active'
            materials.created = formatDateTime(new Date())

            materialsCollection.createIndex({ code: 1 }, { unique: true })

            return materialsCollection.insert(materials)
                .then(doc => resolve(doc.ops[0]))
                .catch((err) => {
                    console.log(`[me-empresta-api] => [materials/service.js] => [create] => ${err.message}`)
                    return reject(new InfrastructureError(err))
                })
        } catch (err) {
            console.log(`[me-empresta-api] => [materials/service.js] => [create] => ${err.message}`)
            return reject(err)
        }
    })
}

const list = (query) => {
    console.log('[me-empresta-api] => [materials/service.js] => [list] => Getting materials.')

    return new Promise((resolve, reject) => {
        try {
            const workedQuery = queryService.worker(query)

            if (!workedQuery.status) {
                workedQuery.status = 'active'
            }

            return mongoAdapter.getState().collection('materials')
                .find(workedQuery)
                .toArray((err, docs) => {
                    if (err) {
                        console.log(`[me-empresta-api] => [materials/service.js] => [list] => ${err.message}`)
                        return reject(new InfrastructureError(err))
                    }
                    return resolve(docs)
                })
        } catch (ex) {
            console.log(`[me-empresta-api] => [materials/service.js] => [list] => ${ex}.`)
            return reject(ex)
        }
    })
}

const one = (query) => {
    console.log('[me-empresta-api] => [materials/service.js] => [one] => Getting one materials by query.')

    return new Promise((resolve, reject) => {
        try {
            if (!query) {
                throw new BusinessError('Empty query.');
            }
            const workedQuery = Object.assign({}, query);

            if (!workedQuery.status) {
                workedQuery.status = 'active';
            }

            return mongoAdapter.getState().collection('materials')
                .findOne(workedQuery, (err, doc) => {
                    if (err) {
                        console.log(`[me-empresta-api] => [materials/service.js] => [one] => ${err.message}`)
                        return reject(new InfrastructureError(err));
                    }
                    return resolve(doc);
                });
        } catch (err) {
            console.log(`[me-empresta-api] => [materials/service.js] => [one] => ${ex}.`)
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
