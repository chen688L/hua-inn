'use strict'

module.exports = {
    session:{
        key:'koa:sess',
        maxAge:86400000,
        overwrite:true,
        httpOnly:true,
        signed:true,
        rolling:false,
        renew:false
    },
    jwt:{
        secretKey:'myAppToken',
        tokenExpiresTime:1000*60//1000*60表示一分钟
    },
    // cors:{
    //     origin:function(ctx){
    //         const whiteList = ['http://localhost:8080'];
    //         console.log(ctx.header.referer);
    //         let url = ctx.header.referer.substr(0,ctx.header.referer.length -1);
    //         if(whiteList.includes(url)){
    //             return url;
    //         //}
    //         return 'http//localhost:8080'
    //     },
    //     maxAge:5,
    //     credentials:true,
    //     allowMethods:['GET','POST','PUT','DELETE','OPTIONS'],
    //     allowHeader:['Content-Type','Authorization','Accept'],
    //     exposeHeader:['WWW-Authenticate','Server-Authorization']
    // }
}