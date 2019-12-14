const koa = require('koa'),
      router = require('koa-router')(),
      common = require('./module/common.js'),
      bodyParser = require('koa-bodyparser')
const app = new koa()

router.get('/news',async (ctx,next)=>{
    ctx.body = "新闻page"
    next()
})
app.use(router.routes())
app.use(router.allowedMethods())
app.use(bodyParser())

router.post('/doAdd',async(ctx,next)=>{
    // ctx.body = ctx.request.body
    console.log(ctx.request.body);
    next()
})


app.listen(3002)

