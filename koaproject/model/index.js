const config = require('../config/db-config');
const Sequelize = require("sequelize");
const {QueryTypes,DataTypes} = require("sequelize");
const sequelize = require('sequelize');



var sequelizeObj = new Sequelize(
    config.mysql.database,
    config.mysql.user,
    config.mysql.password,
    config.sequelize
)
//连接数据库，固定的方法
const user = require('../model/user')(sequelizeObj,DataTypes);//DataTypes数据的一些定义，比如数据的类型
const role = require('../model/role')(sequelizeObj,DataTypes);
const goods = require('../model/goods')(sequelizeObj,DataTypes);
const orders = require('../model/orders')(sequelizeObj,DataTypes);



const news = require('../model/news')(sequelizeObj,DataTypes);//DataTypes数据的一些定义，比如数据的类型
const newsType = require('../model/newsType')(sequelizeObj,DataTypes);


//user-----
role.hasMany(user,{
    foreignKey:'roleid',
    sourceKey:'id'
})
user.belongsTo(role,{
    foreignKey:'roleid',
    targetKey:'id'
})
//goods-----
user.hasMany(goods,{
    foreignKey:'userid',
    sourceKey:'id'
})
goods.belongsTo(user,{
    foreignKey:'userid',
    targetKey:'id'
})
//orders----
user.hasMany(orders,{
    foreignKey:'userid',
    sourceKey:'id'
})
orders.belongsTo(user,{
    foreignKey:'userid',
    targetKey:'id'
})
// orders.belongsTo(user,{
//     foreignKey:'company',
//     targetKey:'id'
// })
//news-----
newsType.hasMany(news,{
    foreignKey:'news_type_id',
    sourceKey:'id'
})
news.belongsTo(newsType,{
    foreignKey:'news_type_id',
    targetKey:'id'
})
news.belongsTo(user,{
    foreignKey:'userid',
    targetKey:'id'
})


module.exports = {user,role,goods,orders,news,newsType}