const express = require('express')
const user = require('./controller')
//const jwt = require('jsonwebtoken')
//const auth = require('./../auth')
//const jwtSecret = 'DevPlenoRocks!'

const router = express.Router()
const controller = user()

//router.use(auth.checkJWT({ jwt, jwtSecret }))
router.route('/')
  .post(controller.create)

router.route('/login')
  .post(controller.login)

module.exports = router
