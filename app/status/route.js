const express = require('express')
const status = require('./controller')

const router = express.Router()
const controller = status()

router.route('/')
  .get(controller.list)

router.route('/')
  .post(controller.create)

module.exports = router
