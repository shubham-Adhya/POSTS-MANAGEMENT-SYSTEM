const express = require("express")
const userRouter = express.Router();
const { UserModel } = require("../model/users.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

//registration
userRouter.post("/register", async (req, res) => {
    // console.log(req.body)
    const {name,email,gender,password,age,city,is_married}=req.body;
    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            // Store hash in your password DB.
            const user = new UserModel({ name, email, gender, password: hash, age, city, is_married })
            await user.save()
            res.status(200).send({ "msg": "User Registration Successful" })
        });
    } catch (error) {
        res.status(400).json({ "msg": error.message })
    }
})

//login
userRouter.post("/login", async (req, res) => {

})

module.exports = {
    userRouter
}