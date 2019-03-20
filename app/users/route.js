const express = require('express')
const user = require('./controller')
const jwt = require('jsonwebtoken')
const auth = require('./../auth')
const jwtSecret = 'DevPlenoRocks!'

const router = express.Router()

router.post('/login', user.login({ jwt, jwtSecret }))

router.route('/')
  .post(user.create)

module.exports = router
