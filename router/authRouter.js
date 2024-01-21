const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')

router.post('/registration',
    userController.registration
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);

module.exports = router
