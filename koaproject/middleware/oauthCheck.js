const passport = require('../middleware/passport')
module.exports = {
    apiJwtCheck:async(ctx,next)=>{//如果请求头中有token就交给passport的authenticate查看时间过期了没有
        console.log(ctx.request.header);
        if(ctx.request.header.authorization){//登陆后解析token passport.authenticate(‘jwt’, { session: false })
            return passport.authenticate('jwt',{session:false},async(err,user,info)=>{
                if(err){
                    ctx.body = {
                        code:0,
                        msg:info
                    }
                }
                if(user){
                    await next()
                }else{
                    ctx.body = {
                        code:0,
                        msg:info
                    }
                }
            })(ctx,next)
        }else{
            ctx.body = {success:false,err:{code:0,msg:'未经授权,禁止访问'}}
        }
    },
    sessionCheck:async(ctx,next)=>{
        if(ctx.isAuthenticated()){//对用户进行权限的验证
            await next();
        }else{
            ctx.session.logInfo = "登录账户异常，请重新登录"
            ctx.response.redirect('/login');
        }
    },
    
}