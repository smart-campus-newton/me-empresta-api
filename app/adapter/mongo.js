const MongoClient = require('mongodb').MongoClient
const config = require('../config/mongo')
const { URI } = config

const MongoAdapter = {
  connect,
  close,
  getState,
  wipeDB
}

const state = {
  db: null
}

function connect() {
  console.log(`[me-empresta-api] => [adapters/mongo.js] => [connect] => Trying to connect at: ${URI}`)

  return new Promise((resolve, reject) => {
    if (state.db) {
      return resolve()
    }
    const client = new MongoClient(URI);

    client.connect(function(err) {
      console.log("Connected correctly to server");

      const dbName = 'meemprestaapi'
      const db = client.db(dbName);
      state.db = db

      return resolve()
    });
  })
}

function close() {
  if (state.db) {
    state.db.close((err) => {
      if (err) {
        console.log(`[me-empresta-api] => [adapters/mongo.js] => [close] => Error at close DB. Error: ${err}`)
        return
      }
      state.db = null
      console.log('[me-empresta-api] => [adapters/mongo.js] => [close] => DB closed successfully')
    })
  }
}

function wipeDB() {
  return new Promise((resolve, reject) => {
    if (state.db) {
      state.db.dropDatabase((err) => {
        if (err) {
          console.log(`[me-empresta-api] => [adapters/mongo.js] => [wipeDB] => Fail to wipe mongodb. Error: ${err}`)
          return reject()
        }
        return resolve()
      })
    }
  })
}

function getState() {
  return state.db
}

module.exports = function factory() {
  return MongoAdapter
}
