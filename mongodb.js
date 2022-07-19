const { MongoClient } = require("mongodb");

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = "task-manager"

const database = MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error){
        return console.log("Unable to connect to the database");
    }

    const db =  client.db(databaseName).collection('users');
    // const dbSearch = client.db(databaseName)
    
    // db.insertOne({
    //     name: "Orobola Roland",
    //     age: 29
    // }, async (err, result) => {
    //     if (err){
    //         return console.log("Unable to insert a user")
    //     }

    //     const entryresult = await db.findOne({ _id: result.insertedId})
    //     console.log(entryresult)
    // })

    // db.findOne({name: "RollyJS"})
    //     .then(result => console.log(result))
    //     .catch(error => console.log("Error: " + error))

    // db.insertMany([
    //     {
    //         description: "Subscribe to DSTV",
    //         completed: true
    //     },
    //     {
    //         description: "Invest today",
    //         completed: false
    //     },
    //     {
    //         description: "Buy a car",
    //         completed: true
    //     }
    // ], (error, result) => {
    //     if (error){
    //         return console.log("Unable to add users")
    //     }

    //     console.log(result)
    // })
})

// Promise chaining and chaining multiple callback function
const add = (a, b) => {
    
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b)
        }, 1000);
    })
}

add(1, 2).then(sum => {
    console.log(sum)
    return add(sum, 10)
}).then(sum2 => {
    console.log(sum2)
}).catch(e => console.log(e))


