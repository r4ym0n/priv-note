const router = require('koa-router')()
const rsa = require('node-rsa')()

router.prefix('/msg')

router.post('/*', function (ctx, next) {
  // console.log(ctx.url)

  privateKey = ctx.url.replace('/msg/', '')
  privateKey = '-----BEGIN RSA PRIVATE KEY-----\n'+privateKey+'\n-----END RSA PRIVATE KEY-----'
  console.log(privateKey)
  rsa.importKey(privateKey, 'pkcs1-private-pem')
  chiphertext = ctx.request.rawBody
  console.log(chiphertext)
  const decrypted = rsa.decrypt(chiphertext, 'utf-8');
  console.log(decrypted)

  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
