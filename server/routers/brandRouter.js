const express = require('express')
const router = express.Router()
const brandController = require('../Controllers/brandController')

router.post('/',brandController.create)
router.get('/',brandController.getAll)
router.delete('/:id',brandController.Delete)

module.exports = router
