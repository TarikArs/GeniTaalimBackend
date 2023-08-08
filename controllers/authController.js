const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const shortid = require("shortid");
const signUp = async (req, res) => {
    const { firstName, lastName, email, password, contactNumber } = req.body;
    if (!firstName || !lastName || !email || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Please Provide Required Information",
        });
    }

    const hash_password = await bcrypt.hash(password, 10);
    const userData = { firstName, lastName, email, hash_password, contactNumber };
    const user = await User.findOne({ email });
    user ?
        res.status(StatusCodes.BAD_REQUEST).json({ message: "User already registered" }) :
        User.create(userData).then((data, err) => {
            if (err) res.status(StatusCodes.BAD_REQUEST).json({ err });
            else
                res.status(StatusCodes.CREATED).json({ message: "User created Successfully" });
        }).catch((err) => {
            res.status(StatusCodes.BAD_REQUEST).json({ err });
        });

};
const signIn = async (req, res) => {
    try {

        const { email, password } = req.body
        if (!email || !password) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Please enter email and password" });
        }
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "User does not exist..!" });
        }
        const isPasswordValid = await user.authenticate(password);
        if (!isPasswordValid) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: "The credentials do not match" });
        }
        const { _id, firstName, lastName, role, fullName } = user;
        const token = jwt.sign({ _id, role }, process.env.JWT_SECRET, { expiresIn: "30d" });

        return res.status(StatusCodes.OK).json({ token, user: { _id, firstName, lastName, email, role, fullName } });


    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error });
    }
};



module.exports = { signUp, signIn };