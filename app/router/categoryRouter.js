const Router = require('express')
const router  = new Router()
const categoryController = require('../controllers/categoryController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/', categoryController.getCategories)
router.put('/:id', checkRole('ADMIN'), categoryController.updateCategory)
router.post('/', checkRole('ADMIN'), categoryController.createCategory)
router.delete('/:id', checkRole('ADMIN'), categoryController.deleteCategory)


module.exports = router
