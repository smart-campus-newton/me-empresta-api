const config = require('config')

const databaseConfig = config.get('DATABASE.MYSQL.DEVELOPMENT')

const dbConfig = {
    default: {
        username: databaseConfig.USER,
        password: databaseConfig.PASSWORD,
        database: databaseConfig.DATABASE,
        host: databaseConfig.HOST,
        port: databaseConfig.PORT,
        dialect: 'mysql'
    }
}

module.exports = dbConfig
