require('dotenv').config();
const DB = process.env.MONGO_DB;
const URL = process.env.MONGO_URI;
const MongoClient = require('mongodb').MongoClient;

const connectDB = async () => {
    try {
        const client = await MongoClient.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db(DB);
        console.log(`Connected to ${DB} database`);
        return db;
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

module.exports = connectDB;