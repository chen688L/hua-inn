module.exports = function(sequelize,DataTypes){
    return sequelize.define(
        'news_typ',
        {
            id:{
                autoIncrement:true,
                type:DataTypes.INTEGER,
                primaryKey:true,
                allowNull:false
            },
            news_type:{
                type:DataTypes.STRING,
                allowNull:true
            }
        }
    )
}