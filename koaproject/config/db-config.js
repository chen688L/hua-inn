module.exports = {
    mysql:{
        database:'koa_test',
        user:'root',
        password:'123456',
        PORT:'3306',
        host:"127.0.0.1"
    },
    sequelize:{
        host:'127.0.0.1',
        dialect:'mysql',
        dialectOptions:{
            //字符集
            charset:'utf8mb4',
            collate:'utf8mb4_unicode_ci',
            supportBigNumbers:true,
            bigNumberString:true
        },
        pool:{
            max:5,
            min:0,
            acquire:30000,
            idle:10000
        },
        define:{
            //是否冻结表名，最好设置为true，要不然sequelize会自动给表名
            freezeTableName:true,
            timestamps:false,   //是否为表添加createdAt（创建时间）和uploadAt（字段更新时间）字段
            paranoid:false,
            operatorsAliases:false  //是否开启op
        },
        timezone:'+08:00'   //时区
    }
}