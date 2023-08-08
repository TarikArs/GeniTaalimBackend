const express = require("express");
const authRouter = require("./routes/authRoutes");
const connectDB = require("./db/connexion");
require("dotenv").config();
var cors = require("cors");
/******************** */


const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", authRouter);
//Port and Connect to DB
const port = process.env.PORT || 5000;
const start = async () => {
    try {
        await connectDB();
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.log("error =>", error);
    }
};
start();