const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || 'reactLearn',
    //MongoClient = require('mongodb').MongoClient;
    mongoUri:
        "mongodb+srv://Manu:manu@initalcluster-alumn.mongodb.net/test",
    // const client = new MongoClient(uri, { useNewUrlParser: true });
    // client.connect(err => {
    //   const collection = client.db("test").collection("devices");
    //   // perform actions on the collection object
    //   client.close();
    // });

}

export default config;