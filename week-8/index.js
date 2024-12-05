const express = require('express')
const app  = express()
const { userRouter } = require("./routes/user")
const { courseRouter } = require("./routes/course")
const { adminRouter } = require("./routes/admin")
const { default: mongoose } = require('mongoose')

app.use(express.json());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/admin", adminRouter);


async function main(){
    console.log("connected to Mongodb...")
    await mongoose.connect("mongodb://localhost:27017/coursera-app")
    app.listen(3000)
}

main()