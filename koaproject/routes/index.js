const router = require('koa-router')()
const newsController = require('../controller/newsController')
const indexController = require('../controller/indexController')
const oauthCheck = require('../middleware/oauthCheck')


router.get('/',indexController.index)
//登录操作

router.post('/checkLogin',indexController.checkLogin)

//错误处理
router.get('/error',indexController.error)


router.post('/user/searchUser',indexController.searchUserByInfo)




//主页面
router.get('/home',oauthCheck.sessionCheck)
router.get('/home',indexController.home)



//vue---------------------------------

//登录成功，生成token
router.post('/loginGetToken', newsController.loginGetToken)
//获取个人信息，用于验证token有效期
router.get('/userInfo/:id', newsController.getuserInfoById)

router.get('/logout',indexController.logout)    //退出登录
router.get('/roles',indexController.roleInfo)   //查询所有角色
router.post('/creatRoleOK',indexController.creatRoleOK) //新增角色
router.post('/deleteRole',indexController.deleteRole)  //注销角色
router.post('/updateRole',indexController.updateRole) //修改角色

router.post('/searchUserByInfo',indexController.searchUserByInfo) //更加条件查询用户--以及分页
router.post('/getGoods',indexController.getGoods)     //处理修改用户
router.post('/creatUserOK',indexController.creatUserOK) //增加用户
router.post('/deleteUserOK',indexController.deleteUserOK) //注销用户
router.post('/updateUserOK',indexController.updateUserOK) //修改用户
router.get('/getUserNum',indexController.getUserNum)  //获取用户总数量

router.get('/getGoodsNum',indexController.getGoodsNum)  //获取商品总数量
router.post('/getGoodsList',indexController.getGoodsList) //获取商品列表
router.get('/getOrdersList',indexController.getOrdersList)  //获取订单列表
router.post('/getOrdersListByID',indexController.getOrdersListByID)  //用户个人查询获取订单列表
router.post('/addOrdersList',indexController.addOrdersList) //新增商品列表
router.post('/rolesByname',indexController.rolesByname)  //根据条件查询角色


// router.all('*',oauthCheck.apiJwtCheck)



router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})




module.exports = router

/*await表达式返回的是什么：promise对象返回成功的值（promise对象有两个重要的属性-值和状态）
*/



