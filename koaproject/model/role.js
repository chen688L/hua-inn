module.exports = function(sequelize,DataTypes){
    return sequelize.define(    //define() 方法的第一个参数为表名，对应的是 users 表
        'role',
        {
            id:{
                type:DataTypes.INTEGER,
                primaryKey:true,
                autoIncrement:true
            },
            rolename:{
                type:DataTypes.STRING,
                field:'rolename'
            }
        }
    )
}