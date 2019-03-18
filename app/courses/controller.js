const COURSE = require('./service')

const courseService = COURSE()

const couseServiceController = {
  list
}

function list (req, res) {
  courseService.findAll()
    .then(result =>
        res.status(201).send(result)
    ).catch((err) => {
      res.status(400).send({ service: 'user', msg: err.message })
    })
}

module.exports = function factory () {
  return couseServiceController
}
