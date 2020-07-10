// Import Dependencies
const url = require('url')
const MongoClient = require('mongodb').MongoClient

// Create cached connection variable
let cachedDb = null
if (process.env.MONGODB_URI == undefined) {
    // local dev-env
    process.env.MONGODB_URI = "mongodb://root:example@127.0.0.1:27017/admin"
}


class MDB {
    constructor() {
        let that = this
        let privateFunctions = function () {
            return {
                connectToDatabase: async (uri) => {
                    if (cachedDb) {
                        return cachedDb
                    }
                    const client = await MongoClient.connect(uri, {
                        useNewUrlParser: true,
                        useUnifiedTopology: true
                    });
                    const db = await client.db(url.parse(uri).pathname.substr(1))
                    cachedDb = db
                    
                    console.log('db connected')
                    that.db = db
                },
            }
        }
        privateFunctions().connectToDatabase(process.env.MONGODB_URI)
    }




    async insertOne(data) {
        return await this.db.collection('site').insertOne(data)
    }
    async findItemByKey(key) {
        return await this.db.collection('site').find(key).toArray()
    }

    async findCipherByKey(key) {
        let result = await this.db.collection('site').find(key).toArray()
        if (result.length > 0) {
            return result[0].cipher
        }
        return (result.length > 0 ? result[0].cipher : '')    
    }
    async deleteItemByCipher(cipher) {
        this.db.collection('site').remove(cipher);
    }
    async findKeyByCipher(cipher) {
        let result = await this.db.collection('site').find(cipher).toArray()
        if (result.length > 0) {
            return result[0].privateKey
        }
        return (result.length > 0 ? result[0].privateKey : '')    
    }

}
// process.env.MONGODB_URI = "mongodb://root:example@127.0.0.1:27017/admin"
function factory() {
    return new MDB()
}

module.exports = factory

    // (async function () {
    //     // Get a database connection, cached or otherwise,
    //     // using the connection string environment variable as the argument
    //     const db = await connectToDatabase(process.env.MONGODB_URI)

    //     // Select the "users" collection from the database
    //     const collection = await db.collection('users')


    //     // console.log(result)
    //     // Select the users collection from the database
    //     const users = await db.collection("site").find({ name: "123" }).toArray()
    //     var myobj = { name: "123", url: "666" };
    //     var result = await db.collection("site").insertOne(myobj);
    //     // Respond with a JSON string of all users in the collection
    //     // console.log(result)
    //     console.log(users)
    //     // return users
    //     //   res.status(200).json({ users })

    // })()