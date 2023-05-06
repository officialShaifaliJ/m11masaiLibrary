const express = require('express');
const UserRouter = express.Router();
const { UserModel } = require('../model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

UserRouter.post("/register", async (req, res) => {
    try {
        const { password, email, name, isAdmin } = req.body;
        bcrypt.hash(password, 5, async (err, hash) => {
            // Store hash in your password DB.
            const user = new UserModel({ password: hash, email, name, isAdmin });
            await user.save();
            res.status(201).send({ "msg": "Successfully done register" })
        });
    }
    catch (err) {
        console.log(err.message);
    }
});

UserRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        console.log(user,"from user route page")
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if(err){
                    res.status(500).send({"msg":err.message});
                    return
                }
                if (result) {
                    res.status(201).send( {
                            "msg": "Login Successfully !",
                            "token" :jwt.sign({"userID":user._id},"MasaiLibrary")
                    })
                } else {
                    res.status(400).send({ "msg": "Wrong Credentials" })
                }
            })
        }
    } catch (error) {

    }
})

module.exports = { UserRouter }