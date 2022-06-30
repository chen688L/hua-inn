const allSqlAction = require('../lib/mysql')

const userDao = require('../dao/userDao')
const {user,role,goods,orders} = require('../model/index')

module.exports = {
    getUserByPhone:async(phone)=>{//参数用于过滤查询
      try {
        return await user.findOne({
          where:{
              phone
          }
      })
      } catch (error) {
        console.log("查找用户错误："+error);
      }
    },
    creatUserOK:async(userid,username,password,phone,salt,roleid)=>{// 创建一个新用户create
      try {
        return await user.create({
          username:username,
          password:password,
          phone:phone,
          salt:salt,
          roleid:roleid
      })
      } catch (error) {
        console.log("新增用户错误："+error);
      }
    },
    updateUserOK:async(userid,username,phone,roleid)=>{// 修改用户密码，根据手机号和原密码
      try {
        return await user.update(
          { username:username,phone:phone,roleid:roleid}, 
          {
          where: {
            id: userid
          }
        });
      } catch (error) {
        console.log("修改用户密码错误："+error);
      }
    },
    deleteUserOK:async(id)=>{// 销毁用户
      try {
        return await user.destroy({
          where: {
            id:id
          }
        });
      } catch (error) {
        console.log("销毁用户错误："+error);
        return null
      }
    },
    getUserBySearchInfo:async(query,currentPage,pageSize)=>{  //查询用户-按条件查询
      try {
        let currentPage1 = parseInt(currentPage)  //页码
        currentPage1 = (currentPage1-1)*pageSize
        let pageSize1 = parseInt(pageSize)    //页数
        let result = await user.findAll({
          offset:currentPage1,
          limit:pageSize1,
          where:query,
          attributes:["id","username","phone","roleid"],//选择某些特定属性
          include:[role],
          order:[
            ['id','ASC']
          ]
        })
        return result;
      } catch (error) {
        console.log("根据查询条件查询用户出错"+error);
        return null;
      }
    },
    getUserNum:async()=>{  //查询用户数量
      try {
        let result = await user.count({})
        return result;
      } catch (error) {
        console.log("根据查询用户数量出错"+error);
        return null;
      }
    },
    getGoodsNum:async()=>{  //查询商品数量
      try {
        let result = await goods.count({})
        return result;
      } catch (error) {
        console.log("根据查询用户数量出错"+error);
        return null;
      }
    },
    getGoodsList:async()=>{  //查询商品列表
      try {
        let result = await goods.findAll({
          order:[['id','DESC']],//记录排序方式
          include: {
            model: user,
        }
        })
        return result;
      } catch (error) {
        console.log("根据查询商品列表出错"+error);
        return null;
      }
    },
    getOrdersList:async()=>{  //查询订单列表
      try {
        let result = await orders.findAll({})
        return result;
      } catch (error) {
        console.log("查询订单列表出错"+error);
        return null;
      }
    },
    getOrdersListByID:async(userid)=>{  //查询订单列表
      try {
        let result = await orders.findAll(
          {
            where:{
              userid:userid
            }
          })
        return result;
      } catch (error) {
        console.log("查询订单列表出错"+error);
        return null;
      }
    },
    addOrdersList:async(reid,title,num,price,phone,address,userid,company,stole,name)=>{  //新增订单列表
      try {
        //更新商品表
        let company1 = parseInt(company)
        console.log(stole-num);
        let stole2 = stole-num
        let reducenum = await goods.update(
          {stole:stole2,},
          { 
            where: {
            id: reid
          }
        }
        )
        //插入订单表
        let result = await orders.create({
          title:title,
          num:num,
          price:price,
          address:address,
          phone:phone,
          name:name,
          userid:userid,
          company:company1
        })
        return result;
      } catch (error) {
        console.log("查询订单列表出错"+error);
        return null;
      }
    },
    roleManage:async(query)=>{    //查询角色
      try {
        let result = await role.findAll()
        return result;
      } catch (error) {
        console.log("根据查询条件查询角色出错"+error);
        return null;
      }
    },
    updateRole:async(id,name)=>{// 修改用户密码，根据手机号和原密码
      try {
        return await role.update(
          { rolename:name}, 
          {
          where: {
            id: id
          }
        });
      } catch (error) {
        console.log("修改角色名字错误："+error);
      }
    },
    rolesByname:async(name)=>{
      try {
        let result = await role.findOne({
          where:{
            rolename:name
          }
        }    
        )
        return result;
      } catch (error) {
        console.log("根据查询条件查询角色出错"+error);
        return null;
      }
    },
    creatRoleOK:async(rolename)=>{// 创建一个新用户create
      try {
        return await role.create({
          rolename:rolename
      })
      } catch (error) {
        console.log("新增用户错误："+error);
      }
    },
    deleteRoleOK:async(id)=>{// 销毁角色
      try {
        return await role.destroy({
          where: {
            id:id
          }
        });
      } catch (error) {
        console.log("销毁角色错误："+error);
      }
    },
    getGoods:async(newsTypeId,newsNum)=>{
        try {
            let newsNum1=parseInt(newsNum)
            let result = await goods.findAll({
                limit:newsNum1,
                // where:{
                //     stole:newsTypeId
                // },
                // attributes:{exclude:['id','userid']},//仅查找某些属性，可以使用该attributes选项
                // order:[['id','DESC']],
                // include:[
                //     {model:user,attributes:[['username']]}
                // ]
            })
            return result;
        } catch (error) {
            console.log("查找新闻列表错误"+error);
            return null;
        }
      }


}