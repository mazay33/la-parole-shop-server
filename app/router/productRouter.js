const Router = require('express')
const router  = new Router()
const productController = require('../controllers/productController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/', productController.getProducts)
router.get('/:id', productController.getProduct)
router.put('/:id', checkRole('ADMIN'), productController.updateProduct)
router.post('/', checkRole('ADMIN'), productController.createProduct)
router.delete('/:id', checkRole('ADMIN'), productController.deleteProduct)

router.post('/add-to-cart', productController.addToCart)


module.exports = router
