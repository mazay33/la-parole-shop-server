const Router = require('express')
const router  = new Router()
const subCategoryController = require('../controllers/subCategoryController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/', subCategoryController.getSubCategories)
router.put('/:id', checkRole('ADMIN'), subCategoryController.updateSubCategory)
router.post('/', checkRole('ADMIN'), subCategoryController.createSubCategory)
router.delete('/:id', checkRole('ADMIN'), subCategoryController.deleteSubCategory)


module.exports = router
