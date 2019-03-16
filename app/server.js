const express = require('express')
const config = require('config')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.set('port', config.get('APP.PORT'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const upServer = () => {
    app.listen(app.get('port'), () => {
      console.log(`[me-empresta-api] => [server.js] => [upServer] => Server is running at port: ${app.get('port')}.`)
    })
}

upServer()

module.exports = app
