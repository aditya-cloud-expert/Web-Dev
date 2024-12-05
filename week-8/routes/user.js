const express = require("express");
const { Router } = require("express")
const userRouter = Router()
const { userModel }= require("../db")
const jwt = require("jsonwebtoken")
const { JWT_USER_PASSWORD } = require("../config")

userRouter.post("/signup",async function(req , res){
    const { email , firstname , lastname , password } = req.body;
    // todo: hash  the password using bcrypt and then store
    // put inside try catch block
    await userModel.create({
        email: email,
        password: password,
        firstname: firstname,
        lastname: lastname
    })


    res.json({
        message : "you are signed-up"
    })
})

userRouter.post("/signin",async function(req , res){
    const { email , password } = req.body;

    console.log("email " + email)
    console.log("password "+ password);

    const user = await userModel.findOne({
        email: email ,
        password : password
    })

    console.log(user);
    if(user){
        const token = jwt.sign({
            id : user._id
        }, JWT_USER_PASSWORD);

        res.json({
            token: token
        })
    }
    else {
        res.status(403).json({
            message : "Incorrect Credentials"
        })
    }
})

userRouter.get("/purchases", function(req , res){
    res.json({
        message : "hi"
    })
})

module.exports = {
    userRouter : userRouter
}