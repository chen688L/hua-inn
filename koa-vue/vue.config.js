module.exports={
    devServer:{
        proxy:{
            '/api':{
                target:'http://localhost:3000',
                pathRewrite:{
                    '^/api':'/loginGetToken'
                }
            },
            '/notes':{
                target:'http://localhost:3000',
                pathRewrite:{
                    '^/notes':'/loginGetToken'
                }
            },
            '/upload':{
                target:'http://localhost:3000',
                pathRewrite:{
                    '^/upload':'/upload'
                }
            },
            
            
        },
        host: '0.0.0.0',
        disableHostCheck: true
    }
};