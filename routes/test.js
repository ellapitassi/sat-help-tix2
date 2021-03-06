const router = require('express').Router()
const Test = require('../db/models/tests');
const Student = require('../db/models/students');

router.get('/passing', function (req, res, next) {
  Test.passing()
  .then(tests => res.status(200).json(tests))
  .catch(next)
})

router.get('/', function (req, res, next) {
  Test.findAll()
  .then(tests => res.json(tests))
  .catch(next)
})

router.get('/:id', function (req, res, next) {
  Test.findById(req.params.id)
  .then(test => res.status(200).json(test))
  .catch(next)
})

router.get('/subject/:subject', function (req, res, next) {
  Test.findAll({
    where: {
      subject: req.params.subject
    }
  })
  .then(test => res.status(200).json(test))
  .catch(next)
})

router.post('/:studentId', function(req, res, next) {
  let studentInstance;
  Student.findOne({
    where: {
      id: req.params.studentId
    }
  })
  .then(student => {
    studentInstance = student
    return Test.create(req.body)
  })
  .then(test => {
    test.setStudent(studentInstance)
    res.status(201).json(test)
  })
  .catch(next)
})

router.delete('/:id', function (req, res, next) {
  Test.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(() => res.send('deleted!'))
  .catch(next)
})

module.exports = router;
