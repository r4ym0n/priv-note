const router = require('koa-router')()
const rsa = require('node-rsa')()

router.prefix('/msg')

router.post('/*', function (ctx, next) {

  privateKey = ctx.url.replace('/msg/', '')
  var privateKey = new Buffer(privateKey, 'base64').toString();
  // console.log(privateKey)

  cipher = ctx.request.rawBody
  // console.log(cipher)

  rsa.importKey(privateKey, 'pkcs1-private-pem')
  try {
    const decrypted = rsa.decrypt(cipher, 'utf-8');
    console.log(decrypted)
  }catch(err) {
    console.log(err.message)
    ctx.body = err.message
    return
  }

  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
