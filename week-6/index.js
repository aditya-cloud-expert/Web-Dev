const express = require('express')
const app = express()

app.use(express.json())

const users = [];

function generateToken(){
    return Math.random();
}

app.post("/signup",function(req , res){
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username: username,
        password: password
    })

    res.send({
        users
    }).status(200)
})

app.post("/signin", function(req, res){
    const username = req.body.username;
    const password = req.body.password;
    let founduser = null;

    for(let i =0; i < users.length; i++)
    {
        if(users[i].username == username && users[i].password == password)
        {
            
            users[i].token = generateToken();
            founduser = users[i];
        }
    }

    res.send({founduser}).status(200);
})

app.listen(3000);