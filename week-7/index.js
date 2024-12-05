const express = require('express')
const { UserModel , TodoModel } = require('./db')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/todo-database");
const JWT_SECRET = "aditya"
const app = express();
app.use(express.json());

app.get("/", function(req, res){
    res.status(200).send({
        "message" : "get endpoint"
    })
})

app.post("/signup",async function(req, res) {
    const email = req.body.username
    const password = req.body.password
    const name = req.body.name

    await UserModel.create({
        email: email,
        password: password,
        name: name
    })

    res.json({
        message : "you are signed up"
    })
})

app.post("/login",async function(req, res){
    const email = req.body.username
    const password = req.body.password

    const user = await UserModel.findOne({
        email: email,
        password: password
    })

    if(user){
        const token = jwt.sign({
            id: user._id
        }, JWT_SECRET);
        res.json({
            token : token
        })
    }
    else{
        res.status(403).json({
            message: "Incorrect Credentials"
        })
    }

})

app.post("/todo", function(req, res){
    
})

app.get("/todo", function(req, res){
    
})

app.listen(3000);