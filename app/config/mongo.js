const exportConfig = require('export-config')

const MongoConfig = {
  default: {
    URI: process.env.MONGO_ADDRESS || 'mongodb://smart:Scn-35085808@cluster0-shard-00-00-xqyo9.mongodb.net:27017,cluster0-shard-00-01-xqyo9.mongodb.net:27017,cluster0-shard-00-02-xqyo9.mongodb.net:27017/meemprestaapi?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true'
  },
  development: {
    URI: process.env.MONGO_ADDRESS || 'mongodb://smart:Scn-35085808@cluster0-shard-00-00-xqyo9.mongodb.net:27017,cluster0-shard-00-01-xqyo9.mongodb.net:27017,cluster0-shard-00-02-xqyo9.mongodb.net:27017/meemprestaapi?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true'
  },
  required: ['URI']
}

module.exports = exportConfig(MongoConfig)