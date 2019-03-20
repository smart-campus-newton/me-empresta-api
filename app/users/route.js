const express = require('express')
const user = require('./controller')
const jwt = require('jsonwebtoken')
const auth = require('./../auth')
const config = require('config')

const router = express.Router()
const jwtSecret = config.get('APP.SECRET')
router.post('/login', user.login({ jwt, jwtSecret }))

router.route('/')
  .post(user.create)

module.exports = router
