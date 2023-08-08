const mongoose = require("mongoose");
const shortid = require("shortid");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
        trim: true,
        min: 3,
        max: 20,
    },
    lastName: {
        type: String,
        require: true,
        trim: true,
        min: 3,
        max: 20,
    },
    username: {
        type: String,
        require: true,
        trim: true,
        unique: true,
        lowercase: true,
        index: true,
        default: () => {
           
            return shortid.generate();
        }
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    hash_password: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        enum: ["teacher", "learner", "admin"],
        default: "learner",
    },
    contactNumber: {
        type: String,
    },
    profilePicture: {
        type: String,
    },
    language: {
        type: String,
        default: "fr",
    },
}, { timestamps: true });
userSchema.virtual("fullName").get(function () {
    return `${this.firstName} ${this.lastName}`;
});
userSchema.method({
    async authenticate(password) {

        return bcrypt.compare(password, this.hash_password);
    },
});
module.exports = mongoose.model("User", userSchema);