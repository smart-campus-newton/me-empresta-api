const { sequelize } = require(`${__dirname}/../models/index`)

if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === undefined) {
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
} else {
  process.log('This command can only be executed in development environment')
}
