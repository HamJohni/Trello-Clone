const Router = require('express')
const router = new Router()
const columnController = require('../controllers/columnControllers')

router.post('/create',columnController.create)
router.get('/get', columnController.getAll)
router.delete('/delete', columnController.delete)

module.exports = router