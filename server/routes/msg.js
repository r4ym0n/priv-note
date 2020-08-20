const router = require('koa-router')()
const rsa = require('node-rsa')()
const db = require('../modules/db')()
const crypto = require('crypto');

router.prefix('/msg')

router.get('/de/*', async function (ctx, next) {
  var key = ctx.url.replace('/msg/de/', '')
  try {
    result = await db.findCipherByKey({aesKey:key})
    if (result !== ''){
      await db.deleteItemByKey({aesKey:key})
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

router.post('/en/*', function (ctx, next) {

  function aesDecrypt (encrypted, key) {
    const decipher = crypto.createDecipher('aes192', key);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  let cipherB64 = ctx.request.rawBody
  const key = ctx.url.replace('/msg/en/', '')

  try {
      console.log(aesDecrypt(cipherB64, key))
      db.insertOne({aesKey:key,
                    cipher:cipherB64
    })
  }catch(err) {
    console.log(err.message)
    ctx.body = err.message
    return
  }
  ctx.body = 'this is a users response!'
})


router.post('/en_rsa/*', function (ctx, next) {
  let cipherB64 = ctx.request.rawBody

  const privateKeyB64 = ctx.url.replace('/msg/en/', '')
  const privateKey = new Buffer.alloc(privateKeyB64.length, privateKeyB64,'base64').toString('ascii');
  rsa.importKey(privateKey, 'pkcs1-private-pem')
  
  try {
      const decrypted = rsa.decrypt(cipherB64, 'utf-8');
      console.log(decrypted)
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


router.get('/de_rsa/*', async function (ctx, next) {
  // cipherB64 = ctx.url.replace('/msg/de/', '')
  var privateKeyB64 = ctx.url.replace('/msg/de/', '')
  // var privateKey = new Buffer(privateKeyB64, 'base64').toString('ascii');
  // console.log(privateKey)
  // rsa.importKey(privateKey, 'pkcs1-private-pem')
  try {
    result = await db.findCipherByKey({privateKey:privateKeyB64})
    if (result !== ''){
      await db.deleteItemByKey({privateKey:privateKeyB64})
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
