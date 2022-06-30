const indexService = require('../service/indexService');
const newsService = require('../service/indexService')
const encryption = require('../lib/ehcryption')
module.exports = {
    getNewsByTypeNum2:async(ctx,next)=>{
        console.log("news-contrller运行");
        try {
            const newsTypeId = ctx.params.newsTypeId;
            const newsNum = ctx.params.newsNum;
            console.log(newsNum+"-===---===");
            if(!isNaN(newsTypeId)&&!isNaN(newsNum)){
                const result = await newsService.getNewsByTypeNum(
                    parseInt(newsTypeId),parseInt(newsNum)
                );
                if(result){
                    ctx.body = {
                        success:true,
                        err:{code:1,msg:'获取新闻列表成功'},
                        data:result
                    }
                }
            }else{
                ctx.body = {
                    success:false,
                    err:{code:0,msg:'获取新闻列表参数失败'},
                }
            }
        } catch (error) {
            console.log(error);
            ctx.body = {
                success:false,
                err:{code:0,msg:'获取新闻列表失败'},
            }
        }
    },
    loginGetToken:async(ctx,next)=>{
        const phone = ctx.request.body.phone;
        const password = ctx.request.body.password;
        if(phone && password){
            let user = await indexService.checkLogin(phone,password)
            if(user){
                let payload = {userid:user.id};
                let token = encryption.getUserToken(payload);
                console.log(token+'----===---');
                if(token){
                    ctx.body = {
                        success:true,
                        err:{
                            code:1,
                            msg:'获取认证成功'
                        },
                        data:{
                            userid:user.id,
                            token:'Bearer'+token
                        }
                    }
                }else{
                    ctx.body = {
                        success:false,
                        err:{
                            code:0,
                            msg:'获取认证失败'
                        }
                    }
                }
            }else{
                ctx.body = {
                    success:false,
                    err:{
                        code:0,
                        msg:'用户不存在！'
                    }
                }
            }
        }else{
            ctx.body = {
                success:false,
                err:{
                    code:0,
                    msg:'账号密码提交失败！'
                }
            }
        }
       
    },
    getuserInfoById:async(ctx,next)=>{
        console.log("getuserInfoById运行");
        const id = ctx.request.body.id;
        let user = await indexService.getuserInfoById(id)
        if(user){
            ctx.body = {
                success:false,
                err:{
                    code:1,
                    msg:'用户存在！'
                }
            }
        }else{
            ctx.body = {
                success:false,
                err:{
                    code:0,
                    msg:'用户不存在！'
                }
            }
        }
       
    },
}