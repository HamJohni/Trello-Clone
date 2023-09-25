const Router = require('express')
const router = new Router()

const userRouter = require('./userRouter')
const columnRouter = require('./columnRouter')
const cardRouter = require('./cardRouter')

router.use('/user', userRouter)
router.use('/column', columnRouter)
router.use('/card', cardRouter)

module.exports = router