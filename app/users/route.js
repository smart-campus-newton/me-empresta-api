const express = require('express')
const user = require('./controller')

const router = express.Router()
const controller = user()

router.route('/')
  .post(controller.create)

module.exports = router
