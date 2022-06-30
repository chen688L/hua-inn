const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

//路由访问
const index = require('./routes/index')
const users = require('./routes/users')
const news = require('./routes/apis/news')
const errorHandle = require('./middleware/error')

//应用koa-passport配置
const passport = require('koa-passport')

//cors中间件，跨域处理
const cors = require('koa2-cors')

//增加错误处理拦截
app.use(errorHandle)

const session = require('koa-session')
const baseConfig = require('./config/base-config')

// error handler
onerror(app)

app.keys =['some secret hurr'];
app.use(session(baseConfig.session,app));

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(cors(baseConfig.cors));

app.use(views(__dirname + '/views', {
  // extension: 'nunjucks'
  map:{html:'nunjucks'}
}))




// app.keys =['some secret hurr'];
// const CONFIG = {
//     key:'koa:sess',
//     maxAge:86400000,
//     overwrite:true,
//     httpOnly:true,
//     signed:true,
//     rolling:false,
//     renew:false
// };
// app.use(session(CONFIG,app))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

//使用passport中间件
app.use(passport.initialize())
app.use(passport.session())

// 回调到config文件中 passport.js
// require('./middleware/passport')(passport);

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(news.routes(),news.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
