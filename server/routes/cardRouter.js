const Router = require('express')
const router = new Router()
const cardController = require('../controllers/cardControllers')

router.post('/create',cardController.create)
router.get('/get', cardController.get)
router.delete('/delete', cardController.delete)
router.patch('/change/:id', cardController.change)

module.exports = router