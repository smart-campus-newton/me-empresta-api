const express = require('express')
const shift = require('./controller')

const router = express.Router()
const controller = shift()

router.route('/')
  .get(controller.list)

router.route('/')
  .post(controller.create)

module.exports = router
