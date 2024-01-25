const Router = require('express')
const router  = new Router()
const cartController = require('../controllers/cartController')

router.get('/', cartController.getCartItems)


module.exports = router
