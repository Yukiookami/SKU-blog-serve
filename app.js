/*
 * @Author: zxy
 * @Date: 2021-06-16 14:02:02
 * @LastEditTime: 2021-07-11 16:20:11
 * @FilePath: /my-blog-serve/app.js
 */
const koa = require('koa')
const Router = require('koa-router')
const mongoose = require('mongoose')
const path = require('path')
// 消息体解析
const body = require('koa-body')
// 跨域
const cors = require('koa2-cors')
// 日志
const logger = require('koa-logger')
// 静态资源生成
const koaStatic = require('koa-static')

const app = new koa()
const router = new Router()

// 指定静态资源
app.use(koaStatic(path.join(__dirname, 'public')))

// 设置跨域
app.use(
  cors({
      origin: function(ctx) { //设置允许来自指定域名请求
        if (ctx.url === '/test') {
            return '*'; // 允许来自所有域名请求
        }
        // 本地测试链接
        return '*'; 
      },
      maxAge: 5, //指定本次预检请求的有效期，单位为秒。
      credentials: true, //是否允许发送Cookie
      allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
      allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'Access-Control-Allow-Origin'], //设置服务器支持的所有头信息字段
      exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Access-Control-Allow-Origin'] //设置获取其他自定义字段
    }
  )
);

// config
const { mongoUrl } = require('./config/keys')

// 引入接口路由
const users = require('./routes/api/users')
const upload = require('./routes/api/upload')
const homePage = require('./routes/api/homePage')
const content = require('./routes/api/content')
const typeClass = require('./routes/api/typeClass')
const appKanri = require('./routes/api/appKanri')

router.get('/', async ctx => {
  ctx.body = {
    msg: '服务启动成功'
  }
})

mongoose.connect(mongoUrl, { useUnifiedTopology: true, useNewUrlParser:true })
  .then(() => {
    console.log('数据库连接成功')
  })
  .catch(err => {
    console.log(err)
  })

// 解决即将废弃问题 
mongoose.set('useFindAndModify', false)

// 中间件
app.use(body(
  {
    // 设为false,表示会解析除了post以外请求的参数
    strict: false
  }
))
app.use(router.routes()).use(router.allowedMethods())
app.use(logger())

// 配置接口路由
router.use('/api/users', users)
router.use('/api/upload', upload)
router.use('/api/homePage', homePage)
router.use('/api/content', content)
router.use('/api/typeClass', typeClass)
router.use('/api/appKanri', appKanri)

const port = process.env.PORT || 12138

// http请求
app.listen(port, () => {
  console.log(`serve started on ${port}`)
})