const express = require('express')
const config = require('config')
const cors = require('cors')
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express')
const swStats = require('swagger-stats')
const swaggerDocument = require('./swagger.json')

const userRoutes = require('./users/route')
const coursesRoutes = require('./courses/route')
const shiftRoutes = require('./shift/route')
const phoneRoutes = require('./phone/route')
const statusRoutes = require('./status/route')
const addressRoutes = require('./address/route')

const app = express()

app.set('port', process.env.PORT || config.get('APP.PORT'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(swStats.getMiddleware({ swaggerSpec: swaggerDocument }))
app.use('/api/user', userRoutes)
app.use('/api/courses', coursesRoutes)
app.use('/api/shift', shiftRoutes)
app.use('/api/phone', phoneRoutes)
app.use('/api/status', statusRoutes)
app.use('/api/address', addressRoutes)

const upServer = () => {
    app.listen(app.get('port'), () => {
      console.log(`[me-empresta-api] => [server.js] => [upServer] => Server is running at port: ${app.get('port')}.`)
    })
}

upServer()

module.exports = app
