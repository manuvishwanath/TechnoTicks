import app from './express';
import config from '../config/config';
import mongoose from 'mongoose';

// connection to mongoDB
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection
    .once('open', () => { "Mongo DB connected successfully at: " + config.mongoUri })
    .on('error', (error) => {
        console.log("mongo connection error:" + error)
        throw new Error(`unable to connect to database: ${config.mongoUri}`)
    })

app.listen(config.port,
    (configError) => {
        if (configError) {
            console.log(`ConfigError : ${configError}`)
        }
        console.log(`Server started at ${config.port}`)

    })