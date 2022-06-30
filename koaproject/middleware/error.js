module.exports = async(ctx,next)=>{
    try {
        await next();
        if(ctx.status===404){
            ctx.throw(404);
        }
    } catch (error) {
        console.log("错误信息1："+ctx.status);
        console.log("错误信息2："+error.stack);
        console.log("错误信息："+error.status);
        const status = ctx.status || 500;
        ctx.status = status;

        if(status===404){
            ctx.session.errorMsg="访问失败了";
            console.log(ctx.session);
        }else if(status === 500){
            ctx.session.errorMsg = ctx.status+"服务器罢工了！！"
        }else if(status === 302){
            ctx.session.errorMsg = ctx.status+"越权了，FBI正在锁定你"
        }else{
            ctx.session.errorMsg = "系统工作人员也在分析这个问题！！"
        }
        ctx.response.redirect('/error')
    }
}