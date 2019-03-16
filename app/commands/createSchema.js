const { sequelize } = require(`${__dirname}/../models/index`)

if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === undefined) {
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
} else {
  process.log('This command can only be executed in development environment')
}
