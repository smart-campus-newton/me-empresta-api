const express = require('express')
const phone = require('./controller')

const router = express.Router()
const controller = phone()

router.route('/')
  .get(controller.list)

router.route('/')
  .post(controller.create)

module.exports = router
