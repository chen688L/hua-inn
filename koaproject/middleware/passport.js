const passport = require('koa-passport')
var LocalStrategy = require('passport-local').Strategy
const indexService = require('../service/indexService')
const useDao = require('../dao/userDao')
const baseConfig = require('../config/base-config')
const jwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const opts = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()//通过配置信息来生成jwt的请求，验证这个token
opts.secretOrKey = baseConfig.jwt.secretKey;
passport.use(new jwtStrategy(opts,async(jwt_payloads,done)=>{//jwt_payload 返回的是登录时返回的数据 即payload
    // console.log("jwt_payloads:"+jwt_payloads);
    // console.log("发布时间:"+new Data(jwt_payloads.iat));
    // console.log("过期时间:"+new Data(jwt_payloads.exp));
    // let nowDate = new Date();
    // if(nowDate.getTime()<=jwt_payloads.exp){//jwt_payloads.userid
    //     const user = await useDao.getUserById(1);
    //     if(user){
    //         return done(null,user,'token验证成功')
    //     }else{
    //         return done(null,false,'token验证失败')
    //     }
        
    // }else{
    //     return done(null,false,'token过期')
    // }

}))

//本地验证
passport.use(new LocalStrategy({//将用户输入的密码加密，与库中做对比
    usernameField:'phone',
    passwordField:'password'
    },
    async function(phone,password,done){
        let result = await indexService.checkLogin(phone,password);
        if(result){
            return done(null,result,'登录成功')
        }else{
            return done(null,false,'账号密码错误')
        }
    }
))

//用户验证登录成功以后，会把用户的数据存在session
passport.serializeUser(function(user,done){
    user.password = '';
    user.salt = '';
    console.log("user_ps:"+user);
    done(null,user)
})
//每次请求的时候，将从session中读取数据
passport.deserializeUser(function(user,done){
    done(null,user)
})

module.exports = passport