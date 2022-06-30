const mysql = require('mysql')
const DBConfig = require("../config/db-config")
//建立连接池
let pool = mysql.createPool(DBConfig.mysql)
let allSqlAction = (sql,value)=>{
    return new Promise((resolve,reject)=>{
        pool.getConnection(function(err,connection){
            if(err){
                console.log(err);
                reject(err)
            }
            else{
                console.log("数据库连接成功");
                connection.query(sql,value,(err,row)=>{
                    if(err) reject(err)
                    else{
                        resolve(row)
                    }
                    connection.release()
                })
            }
        })
    })
}
module.exports = {
    allSqlAction
}