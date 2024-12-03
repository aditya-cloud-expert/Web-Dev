const express = require('express')
const app = express();

app.use(express.json())

const users = []


function signup(req, res) {
    const uname = req.body.username
    const pwd = req.body.password

    // Check if user already exists
    const existingUser = users.find(user => user.username === uname)
    if (existingUser) {
        return res.status(400).send('Username already exists'+ users)
    }

    users.push({
        username: uname,
        password: pwd
    })

    res.status(201).send('User created successfully')
}

function signin(req, res) {
    const uname = req.body.username
    const pwd = req.body.password

    // Find user and verify password
    const user = users.find(user => 
        user.username === uname && user.password === pwd
    )

    if (!user) {
        return res.status(401).send('Invalid username or password' + users)
    }

    res.status(200).send('Login successful')
}

app.post('/signin', signin)

app.post('/signup', signup)

app.listen(3000)