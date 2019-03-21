const express = require('express')
const course = require('./controller')

const router = express.Router()
const controller = course()

router.route('/')
  .get(controller.list)

router.route('/')
  .post(controller.create)

module.exports = router