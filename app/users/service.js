const MongoAdapter = require('../adapter/mongo')
const codeGenerator = require('../codeGenerator')
const queryService = require('../query/service')
const mongoAdapter = MongoAdapter()

const create = (payload) => {
  console.log('[me-empresta-api] => [users/service.js] => [create] => Creating users.')

  return new Promise((resolve, reject) => {
    try {
      const usersCollection = mongoAdapter.getState().collection('users')
      const usersPayload = Object.assign({}, payload)
      usersPayload.code = codeGenerator.generate('us')
      usersPayload.status = 'active'
      usersPayload.created = formatDateTime(new Date())

      usersCollection.createIndex({ code: 1 }, { unique: true })

      return usersCollection.insert(usersPayload)
        .then(doc => resolve(doc.ops[0]))
        .catch((err) => {
          console.log(`[me-empresta-api] => [users/service.js] => [create] => ${err.message}`)
          return reject(err)
        })
    } catch (err) {
      console.log(`[me-empresta-api] => [users/service.js] => [create] => ${err.message}`)
      return reject(err)
    }
  })
}

const login = (payload) => {
  console.log('[me-empresta-api] => [users/service.js] => [one] => Find one users.')

  return new Promise((resolve, reject) => {
    try {
      if (!payload) {
        throw new Error('Empty query.')
      }
      const workedQuery = Object.assign({}, payload)

      if (!workedQuery.status) {
        workedQuery.status = 'active'
      }

      return mongoAdapter.getState().collection('users')
        .findOne(workedQuery, (err, doc) => {
          if (err) {
            console.log(`[me-empresta-api] => [users/service.js] => [one] => ${err.message}`)
            return reject(err)
          }
          return resolve(doc)
        })
    } catch (err) {
      console.log(`[me-empresta-api] => [users/service.js] => [one] => ${err.message}`)
      return reject(err)
    }
  })
}

const edit = (code, payload) => {
  console.log('[me-empresta-api] => [users/service.js] => [edit] => Editing users.')

  return new Promise((resolve, reject) => {
    try {
      const pLoad = Object.assign({}, payload)
      delete pLoad.code

      return mongoAdapter.getState().collection('users')
        .findOneAndUpdate({ code }, { $set: pLoad }, { returnOriginal: false }, (err, doc) => {
          if (err) {
            console.log(`[me-empresta-api] => [users/service.js] => [edit] => ${err.message}`)
            return reject(err.message)
          }
          return resolve(doc.value)
        })
    } catch (err) {
      console.log(`[me-empresta-api] => [users/service.js] => [edit] => ${err.message}`)
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
  login,
  create,
  edit
}
