const Router = require('express')
const router = new Router()
const authRouter = require('./authRouter')
const productRouter = require('./productRouter')

router.use('/auth', authRouter)
router.use('/product', productRouter)

module.exports = router
