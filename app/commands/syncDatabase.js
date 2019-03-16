const { sequelize } = require(`${__dirname}/../models/index`)

sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synced')
    process.exit(0)
  })
  .catch((error) => {
    console.log('An error was found syncing database')
    console.log(error)
    process.exit(1)
  })
