const router = require('koa-router')()
const newsController = require('../../controller/newsController')
router.prefix('/api/news')
router.get('/getNewsByTypeNum2/:newsTypeId/:newsNum',newsController.getNewsByTypeNum2)

module.exports = router