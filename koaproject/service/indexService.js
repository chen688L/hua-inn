
//加mysql
const userDao = require('../dao/userDao')
//md5加密
const encryption = require('../lib/ehcryption')
const Sequelize = require("sequelize");
const {user,news,newsType} = require('../model/index');
const Op = Sequelize.Op;

module.exports = {
    checkLogin:async(phone, password) =>{
        // let user = await userDao.findUserByPhone(phone);
        let user = await userDao.getUserByPhone(phone);
        if (user) {
            // if (user.password == password) {
            //     return user;
            // }
            let encryPass=await encryption.getMd5Pass(password,user.salt);
            if(encryPass == user.password){
                return user;
            }
        }
        return null;
    },
    creatUserOK:async(id,username,password,phone) =>{
        let user = await userDao.creatUserOK(id,username,password,phone);
        if (user) { 
            return user;
        }
        return null;
    },
    updateUserOK:async(phone,password1,password2) =>{
        let user = await userDao.updateUserOK(phone,password1,password2);
        console.log("qqq:"+user[0]);
        if (user) { 
            return user;
        }
        return null;
    },
    deleteUserOK:async(phone,password) =>{
        let user = await userDao.deleteUserOK(phone,password);
        
        if (user) { 
            return user;
        }
        return null;
    },
    //根据条件查询用户或查询所有用户
    searchUserByInfo:async(serchInfo,currentPage,pageSize)=>{
        const likeQuery = ['username','phone'];
        for(let key in serchInfo){
            if(serchInfo[key]===''||serchInfo[key]===undefined) delete serchInfo[key];
            else{
                if(likeQuery.includes(key)){
                    serchInfo[key] = {//LIKE '%hat'
                        [Op.like]:`%${serchInfo[key]}%`
                    }
                }
            }
        }
        console.log("这里是serchInfo："+JSON.stringify(serchInfo));
        let searchResult = await userDao.getUserBySearchInfo(serchInfo,currentPage,pageSize);
        // console.log("这里是service结果："+searchResult);
        return searchResult;
    },
    getNewsByTypeNum:async(newsTypeId,newsNum)=>{
        try {
            let result = await news.findAll({
                limit:newsNum,
                where:{
                    news_type_id:newsTypeId
                },
                attributes:{exclude:['news_type_id','userid']},
                order:[['news_date','DESC']],
                include:[
                    {model:newsType,attributes:[['name','newsTypeName']]},
                    {model:user,attributes:[['username','createNewsUser']]}
                ]
            })
            return result;
        } catch (error) {
            console.log("查找新闻列表错误"+error);
            return null;
        }
    },
    getuserInfoById:async(id)=>{
        try {
            let result = await news.findone({
                id:id
            })
            return result;
        } catch (error) {
            console.log("查找错误"+error);
            return null;
        }
    },
    
}