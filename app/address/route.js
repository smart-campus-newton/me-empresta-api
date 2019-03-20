const express = require('express')
const address = require('./controller')

const router = express.Router()
const controller = address()

router.route('/')
  .get(controller.list)

router.route('/')
  .post(controller.create)

module.exports = router
