const indexService = require('../service/indexService')
const userDao = require('../dao/userDao')
var http = require('http');
const { Passport } = require('koa-passport');
// const { Passport } = require('koa-passport');
const passport = require('../middleware/passport')
module.exports = {
    //打开'/'的页面
    index:async(ctx,next)=>{
        await ctx.render('index',{
            title:'Hello koa Mvc'
        })
    },
    //错误、报错的页面
    error:async(ctx,next)=>{
        console.log("error的:"+JSON.stringify(ctx.session));
        await ctx.render('error',{
            message:ctx.session.errorMsg
        });
    },
    //检查登录是否正确
    checkLogin:async(ctx,next)=>{
        return passport.authenticate('local',async(err,user,info)=>{//用本地策列的
            if(err){
                ctx.session.errorMsg = "passport 本地验证策列错误";
                ctx.response.redirect('/error');
            }
            if(!user){
                ctx.session.logInfo="账户密码错误";
                ctx.response.redirect('/login');
            }else{
                ctx.login(user)//序列化用户-------待查询
                ctx.response.redirect('/home')
            }
        })(ctx)
    },
    //退出登录
    logout:async(ctx,next)=>{
        ctx.logout();//登出,固定的方法
        ctx.response.redirect('/');
    },

    home:async(ctx,next)=>{
        await ctx.render('homeIndex',{
            // user:ctx.session.username,
            user:ctx.state.user,
            info:ctx.session.username,
        });
    },
   
    //处理新增用户
    creatUserOK:async(ctx,next)=>{
        const {userid,username,password,phone,salt,roleid} = ctx.request.body;//获取要注册的数据
        console.log(userid+"  username="+username+"  password="+password+"  phone="+phone+"  salt="+salt+"  roleid="+roleid);
        let user = await userDao.creatUserOK(userid,username,password,phone,salt,roleid)//调用service的方法执行操作
        console.log(user);
        if(user){
           console.log("成功加入1条数据");
           ctx.body = {
            success:true,
            err:{code:1,msg:'获取认证成功'},
            data:{
                users:user
            }
            }
        }else{
            ctx.body = {
                success:false,
                err:{code:0,msg:'获取认证失败'},
                
            }
        }
    },
   
    //处理修改用户
    updateUserOK:async(ctx,next)=>{
        const {userid,username,phone,roleid} = ctx.request.body;//获取要注册的数据
        let user = await userDao.updateUserOK(userid,username,phone,roleid)//调用service的方法执行操作
        if(user){
            console.log("修改成功");
            ctx.body = {
                success:true,
                err:{code:1,msg:'获取认证成功'},
                data:{
                    users:user
                }
            }
        }else{
            ctx.body = {
                success:false,
                err:{code:0,msg:'获取认证失败'},
                
            }
        }
        
    },
    
    //注销用户
    deleteUserOK:async(ctx,next)=>{
        const {userid} = ctx.request.body;//获取要注册的数据
        console.log("到销毁用户了："+userid);
        let user = await userDao.deleteUserOK(userid)
        if(user){
           console.log("成功注销用户");
        }else{
            console.log("销毁失败");
            
        }
    },
     //处理修改用户
     getGoods:async(ctx,next)=>{
        const {newsTypeId,newsNum} = ctx.request.body;//获取要注册的数据
        let user = await userDao.getGoods(newsTypeId,newsNum)//调用service的方法执行操作
        if(user){
            console.log("修改成功");
            ctx.body = {
                success:true,
                err:{code:1,msg:'获取认证成功'},
                data:{
                    goods:user
                }
            }
        }else{
            ctx.body = {
                success:false,
                err:{code:0,msg:'获取认证失败'},
                
            }
        }
        
    },

    //处理新增角色功能
    creatRoleOK:async(ctx,next)=>{
        const {rolename} = ctx.request.body;//获取要注册的数据
        let role = await userDao.creatRoleOK(rolename)//调用service的方法执行操作
        if(role){
            ctx.body = {
                success:true,
                err:{code:1,msg:'获取认证成功'},
                data:{
                    role:role
                }
            }
        }else{
            ctx.body = {
                success:false,
                err:{code:1,msg:'获取认证失败'},
            }
        }
    },
    //销毁角色
    deleteRole:async(ctx,next)=>{
        const {id} = ctx.request.body;//获取数据
        // const {id}  = ctx.query;
        console.log("这个是role的id："+id);
        let role = await userDao.deleteRoleOK(id)//调用service的方法执行操作
        if(role){
            ctx.body = {
                success:true,
                err:{code:1,msg:'获取认证成功'},
                role:role
            }
        }else{
            ctx.body = {
                success:false,
                err:{code:1,msg:'获取认证失败'},
            }
        }
    },
    //查询所有角色
    roleInfo:async(ctx,next)=>{
        let roles = await userDao.roleManage()
        if(roles){
           ctx.body = {
               success:true,
               err:{code:1,msg:'获取认证成功'},
               data:{
                   roles:roles
               }
           }
        }else{
            ctx.body = {
                success:false,
                err:{code:0,msg:'错误查询'}
            }
        }
    },
    //修改角色
    updateRole:async(ctx,next)=>{
        const {id} = ctx.request.body;//获取数据
        const {name} = ctx.request.body;//获取数据
        let roles = await userDao.updateRole(id,name)
        if(roles){
           ctx.body = {
               success:true,
               err:{code:1,msg:'获取认证成功'},
               data:{
                   roles:roles
               }
           }
        }else{
            ctx.body = {
                success:false,
                err:{code:0,msg:'错误查询'}
            }
        }
    },
    rolesByname:async(ctx,next)=>{
        const name = ctx.request.body.name;
        let roles = await userDao.rolesByname(name)
        if(roles){
           ctx.body = {
               success:true,
               err:{code:1,msg:'获取认证成功'},
               data:{
                   roles:roles
               }
           }
        }else{
            ctx.body = {
                success:false,
                err:{code:0,msg:'错误查询'}
            }
        }
    },
    //根据条件查询角色信息
    searchUserByInfo:async(ctx,next)=>{
        const phone = ctx.request.body.phone;
        const username = ctx.request.body.username;
        const roleid = ctx.request.body.roleid;

        const {currentPage,pageSize} = ctx.request.body;//页码
        const serchInfo= {username,phone,roleid}
        let users = await indexService.searchUserByInfo(serchInfo,currentPage,pageSize)
        if(users){
           ctx.body = {
               success:true,
               err:{code:1,msg:'获取认证成功'},
               data:{
                   users:users
               }
           }
        }else{
            ctx.body = {
                success:false,
                err:{code:0,msg:'错误查询'}
            }
        }
    },
    getUserNum:async(ctx,next)=>{//获取用户总数量
        let usersnum = await userDao.getUserNum()
        if(usersnum){
           ctx.body = {
               success:true,
               err:{code:1,msg:'获取认证成功'},
               data:{
                    usersnum:usersnum
               }
           }
        }else{
            ctx.body = {
                success:false,
                err:{code:0,msg:'错误查询'}
            }
        }
    },
    getGoodsNum:async(ctx,next)=>{//获取商品总数量
        let goodsnum = await userDao.getGoodsNum()
        if(goodsnum){
           ctx.body = {
               success:true,
               err:{code:1,msg:'获取认证成功'},
               data:{
                    goodsnum:goodsnum
               }
           }
        }else{
            ctx.body = {
                success:false,
                err:{code:0,msg:'查询商品总数量错误'}
            }
        }
    },
    getGoodsList:async(ctx,next)=>{//获取商品列表
        let goods = await userDao.getGoodsList()
        if(goods){
           ctx.body = {
               success:true,
               err:{code:1,msg:'获取认证成功'},
               data:{
                 goods:goods
               }
           }
        }else{
            ctx.body = {
                success:false,
                err:{code:0,msg:'查询商品错误'}
            }
        }
    },
    getOrdersList:async(ctx,next)=>{//查询订单列表
        let orders = await userDao.getOrdersList()
        if(orders){
           ctx.body = {
               success:true,
               err:{code:1,msg:'获取认证成功'},
               data:{
                 orders:orders
               }
           }
        }else{
            ctx.body = {
                success:false,
                err:{code:0,msg:'查询商品总数量错误'}
            }
        }
    },
    getOrdersListByID:async(ctx,next)=>{//查询订单列表根据userid
        const {userid} = ctx.request.body;
        let orders = await userDao.getOrdersListByID(userid)
        if(orders){
           ctx.body = {
               success:true,
               err:{code:1,msg:'获取认证成功'},
               data:{
                 orders:orders
               }
           }
        }else{
            ctx.body = {
                success:false,
                err:{code:0,msg:'查询商品总数量错误'}
            }
        }
    },
    addOrdersList:async(ctx,next)=>{//新增订单列表
        const {reid,title,num,price,phone,address,userid,company,stole,name} = ctx.request.body;//页码
        let orders = await userDao.addOrdersList(reid,title,num,price,phone,address,userid,company,stole,name)
        if(orders){
           ctx.body = {
               success:true,
               err:{code:1,msg:'获取认证成功'},
               data:{
                 orders:orders
               }
           }
        }else{
            ctx.body = {
                success:false,
                err:{code:0,msg:'查询商品总数量错误'}
            }
        }
    },
    
}