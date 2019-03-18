const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const basename = path.basename(__filename)
const config = require('config')
const UsersModel = require('./users')
const CoursesModel = require('./courses')
const AddressModel = require('./address')
const ShiftModel = require('./shift')
const StatusModel = require('./status')
const PhoneModel = require('./phone')

const db = {}

const { DEVELOPMENT } = config.get('DATABASE.MYSQL')
const { USER, PASSWORD, DATABASE, PORT, HOST } = DEVELOPMENT

const sequelize = new Sequelize(`mysql://${USER}:${PASSWORD}@${HOST}:${PORT}/${DATABASE}`, {
  operatorsAliases: false,
  dialect: 'mysql'
})

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

const Users = UsersModel(sequelize, Sequelize)
const Courses = CoursesModel(sequelize, Sequelize)
const Address = AddressModel(sequelize, Sequelize)
const Shift = ShiftModel(sequelize, Sequelize)
const Status = StatusModel(sequelize, Sequelize)
const Phone = PhoneModel(sequelize, Sequelize)

Users.belongsTo(Courses);
Users.belongsTo(Address);
Users.belongsTo(Shift);
Users.belongsTo(Status);
Users.belongsTo(Phone);

module.exports = db
