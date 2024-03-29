const jsonwebtoken = require("jsonwebtoken")
const md5 = require("md5")
const uuid = require("uuid")
const baseConfig = require("../config/base-config")


module.exports = {
    //生成token
    getUserToken:(payload)=>{
        let nowDate = new Date();
        payload.iat = nowDate.getTime();
        const token = jsonwebtoken.sign(payload,baseConfig.jwt.secretKey,{expiresIn:baseConfig.jwt.tokenExpiresTime})
        return token;
    },
    //获取uuid
    generateId:()=>{
        return uuid.v4();
    },
    //使用盐值md5加密
    getMd5Pass:async(val,salt)=>{
        let passSalt=md5(md5(val)+salt);
        return passSalt;
    },
    
}