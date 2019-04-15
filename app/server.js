const express = require('express')
const config = require('config')
const cors = require('cors')
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express')
const swStats = require('swagger-stats')
const swaggerDocument = require('./swagger.json')
const MongoAdapter = require('./adapter/mongo');

const userRoutes = require('./users/route')
const coursesRoutes = require('./courses/route')
const materialsRoutes = require('./materials/route')
const loanRoutes = require('./loan/route')

const app = express()
const mongoAdapter = MongoAdapter()

app.set('port', process.env.PORT || config.get('APP.PORT'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(swStats.getMiddleware({ swaggerSpec: swaggerDocument }))
app.use('/api/user', userRoutes)
app.use('/api/courses', coursesRoutes)
app.use('/api/materials', materialsRoutes)
app.use('/api/loan', loanRoutes)

const upServer = () => {
  mongoAdapter.connect()
  .then(() => {
    app.listen(app.get('port'), () => {
      console.log(`[me-empresta-api] => [server.js] => [upServer] => Server is running at port: ${app.get('port')}.`)
    })
  })
  .catch((err) => {
    if (err) {
      console.log(`[me-empresta-api] => [server.js] => [upServer] => General Error: ${err}`);
    }
    process.exit(1);
  });
}

upServer()

module.exports = app
