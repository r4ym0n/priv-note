const router = require('koa-router')()
const rsa = require('node-rsa')()
const db = require('../modules/db')()

router.prefix('/msg')

router.post('/en/*', function (ctx, next) {
  let cipherB64 = ctx.url.replace('/msg/en/', '')

  const privateKeyB64 = ctx.request.rawBody
  const privateKey = new Buffer.alloc(privateKeyB64.length, privateKeyB64,'base64').toString('ascii');
  rsa.importKey(privateKey, 'pkcs1-private-pem')
  
  try {
      const decrypted = rsa.decrypt(cipherB64, 'utf-8');
      // console.log(decrypted)
      db.insertOne({privateKey:privateKeyB64,
                    cipher:cipherB64
    })
  }catch(err) {
    console.log(err.message)
    ctx.body = err.message
    return
  }
  ctx.body = 'this is a users response!'
})


router.get('/de/*', async function (ctx, next) {

  cipherB64 = ctx.url.replace('/msg/de/', '')
  // var privateKey = new Buffer(privateKeyB64, 'base64').toString('ascii');
  // console.log(privateKey)
  // rsa.importKey(privateKey, 'pkcs1-private-pem')

  try {
    result = await db.findKeyByCipher({cipher:cipherB64})
    if (result !== ''){
      await db.deleteItemByCipher({cipher:cipherB64})
    } else {
      result = ""
    }
  }catch(err) {
    console.log(err.message)
    console.log(err.stack);

    ctx.body = err.message
    return
  }

  ctx.body = result
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
