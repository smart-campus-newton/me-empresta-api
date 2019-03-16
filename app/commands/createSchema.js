const { sequelize } = require(`${__dirname}/../models/index`)

sequelize.sync({ force: true })
  .then(() => {
    console.log('Database created')
    process.exit(0)
  })
  .catch((error) => {
    console.log('An error was found creating database')
    console.log(error)
    process.exit(1)
  })
