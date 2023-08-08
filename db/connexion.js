require('dotenv').config();
const URL = process.env.MONGO_URI;
const mongoose = require("mongoose");
const connectDB = () => {
    return mongoose.connect(URL);
};
module.exports = connectDB;