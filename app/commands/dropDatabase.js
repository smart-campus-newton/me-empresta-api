const { sequelize } = require(`${__dirname}/../models/index`)

sequelize.drop()
  .then(() => {
    console.log('Database dropped')
    process.exit(0)
  })
  .catch((error) => {
    console.log('An error was found dropping database')
    console.log(error)
    process.exit(1)
  })

