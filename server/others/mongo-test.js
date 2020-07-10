// Import Dependencies
const url = require('url')
const MongoClient = require('mongodb').MongoClient

// Create cached connection variable
let cachedDb = null

process.env.MONGODB_URI = "mongodb://root:example@127.0.0.1:27017/admin"
// A function for connecting to MongoDB,
// taking a single parameter of the connection string
async function connectToDatabase(uri) {
    // If the database connection is cached,
    // use it instead of creating a new connection
    if (cachedDb) {
        return cachedDb
    }

    // If no connection is cached, create a new one
    const client = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    // Select the database through the connection,
    // using the database path of the connection string
    const db = await client.db(url.parse(uri).pathname.substr(1))

    // Cache the database connection and return the connection
    cachedDb = db
    console.log('db connected')
    return db
}

// The main, exported, function of the endpoint,
// dealing with the request and subsequent response
// module.exports = async (req, res) => {
//     // Get a database connection, cached or otherwise,
//     // using the connection string environment variable as the argument
//     const db = await connectToDatabase(process.env.MONGODB_URI)

//     // Select the "users" collection from the database
//     const collection = await db.collection('users')

//     // Select the users collection from the database
//     const users = await collection.find({}).toArray()

//     // Respond with a JSON string of all users in the collection
//     res.status(200).json({ users })
// }

(async function () {
    // Get a database connection, cached or otherwise,
    // using the connection string environment variable as the argument
    const db = await connectToDatabase(process.env.MONGODB_URI)

    // Select the "users" collection from the database
    const collection = await db.collection('users')

 
    // console.log(result)
    // Select the users collection from the database
    const users = await db.collection("site").find({name:"123"}).toArray()
    var myobj = { name: "123", url: "666" };
    var result = await db.collection("site").insertOne(myobj);
    // Respond with a JSON string of all users in the collection
    // console.log(result)
    console.log(users)
    // return users
    //   res.status(200).json({ users })
    
})()