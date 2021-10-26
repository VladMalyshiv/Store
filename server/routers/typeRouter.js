const express = require('express')
const router = express.Router()
const typeController = require('../Controllers/typeController')
const checkRoleMiddleware = require ('../middleware/checkRoleMiddleware')

router.post('/',checkRoleMiddleware('ADMIN'), typeController.create)
router.get('/', typeController.getAll)
router.delete('/:id', typeController.Delete)

module.exports = router