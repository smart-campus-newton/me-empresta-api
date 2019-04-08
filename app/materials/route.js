const express = require('express')
const controller = require('./controller')
const router = express.Router()

router.route('/')
  .get(controller.list)

router.route('/')
  .post(controller.create)

router.route('/')
  .put(controller.edit)

module.exports = router
