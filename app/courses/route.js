const express = require('express')
const course = require('./controller')

const router = express.Router()
const controller = course()

router.route('/')
  .post(controller.list)

module.exports = router
