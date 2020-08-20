// Import Dependencies
const url = require('url')
const MongoClient = require('mongodb').MongoClient

// Create cached connection variable
let cachedDb = null
if (process.env.MONGO_URL == undefined) {
    // local dev-env
    process.env.MONGO_URL = "mongodb://root:example@127.0.0.1:27017/admin"
}


class MDB {
    constructor(db) {
    }

    async getDBConnection(uri) {
        if (cachedDb) {
            this.db = cachedDb
            return cachedDb
        }
        try {
            const client = await MongoClient.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true })
            const db = await client.db()
            console.log('db connection established')
            cachedDb = db
            this.db = db
            return db
        } catch (err) {
            console.log(err.message)
        }

    }

    async insertOne(data) {
        await this.getDBConnection(process.env.MONGO_URL)
        return await this.db.collection('site').insertOne(data)
    }
    async findItemByKey(key) {
        await this.getDBConnection(process.env.MONGO_URL)
        return await this.db.collection('site').find(key).toArray()
    }

    async findCipherByKey(key) {
        await this.getDBConnection(process.env.MONGO_URL)
        let result = await this.db.collection('site').find(key).toArray()
        if (result.length > 0) {
            return result[0].cipher
        }
        return (result.length > 0 ? result[0].cipher : '')
    }
    async deleteItemByCipher(cipher) {
        await this.getDBConnection(process.env.MONGO_URL)
        this.db.collection('site').deleteOne(cipher);
    }
    async deleteItemByKey(key) {
        await this.getDBConnection(process.env.MONGO_URL)
        this.db.collection('site').deleteOne(key);
    }
    async findKeyByCipher(cipher) {
        await this.getDBConnection(process.env.MONGO_URL)
        let result = await this.db.collection('site').find(cipher).toArray()
        if (result.length > 0) {
            return result[0].privateKey
        }
        return (result.length > 0 ? result[0].privateKey : '')
    }

}
function factory() {

    return new MDB
}

module.exports = factory