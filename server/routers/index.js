const express = require ('express')
const router = express.Router()
const userRouter = require ('./userRouter')
const deviceRouter = require ('./deviceRouter')
const brandRouter = require ('./brandRouter')
const typeRouter = require ('./typeRouter')

router.use('/user', userRouter)
router.use('/device',deviceRouter)
router.use('/type',typeRouter)
router.use('/brand',brandRouter)

module.exports = router