require('dotenv').config()

const Koa = require('koa')
const app = new Koa()
// const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const logger = require('koa-logger')
const bodyparser = require('koa-bodyparser')

const index = require('./routes/index')
const users = require('./routes/users')
const msg = require('./routes/msg')

// error handler
onerror(app)

// middlewares
app.use(json())
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))

// app.use(logger())
app.use(require('koa-static')(__dirname + '/public/app'))

// app.use(views(__dirname + '/views', {
//   extension: 'ejs'
// }))
app.use(async (ctx, next)=> {
  ctx.set('Access-Control-Allow-Origin', '*');
  if (ctx.method == 'OPTIONS') {
    ctx.body = 200; 
  } else {
    await next();
  }
});

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  let url = ctx.url
  if(RegExp("/msg/de/*", "g").exec(url) != null){url = '/msg/de/*'}
  if(RegExp("/msg/en/*", "g").exec(url) != null){url = '/msg/en/*'}
  console.log(`${ctx.method} ${url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(msg.routes(), msg.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
