const express = require('express')
const router = express.Router()
const deviceController = require('../Controllers/deviceController')

router.post('/',deviceController.create)
router.get('/',deviceController.getAll)
router.get('/:id',deviceController.getOne)
router.delete('/:id',deviceController.Delete)

module.exports = router