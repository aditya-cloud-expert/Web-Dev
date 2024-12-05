const { Router } = require("express")
const adminRouter = Router();
const { adminModel, courseModel } = require("../db")
const jwt = require("jsonwebtoken")
const { JWT_ADMIN_PASSWORD } = require("../config")
const { adminMiddleware } = require("../middleware/admin")


adminRouter.post("/signup",async function(req, res){
    const { email , firstname , lastname , password } = req.body;
    // todo: hash  the password using bcrypt and then store
    // put inside try catch block
    await adminModel.create({
        email: email,
        password: password,
        firstname: firstname,
        lastname: lastname
    })


    res.json({
        message : "you are signed-up"
    })
})

adminRouter.post("/signin",async function(req, res){
    const { email , password } = req.body;

    console.log("email " + email)
    console.log("password "+ password);

    const user = await adminModel.findOne({
        email: email ,
        password : password
    })

    console.log(user);
    if(user){
        const token = jwt.sign({
            id : user._id
        }, JWT_ADMIN_PASSWORD);

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



adminRouter.post("/course", adminMiddleware ,async function(req, res){
    const adminId = req.userId;

    const { title, description, imgUrl, price } = req.body

    const course = await courseModel.create({
        title: title ,
        description: description,
        imgUrl : imgUrl ,
        price : price,
        creatorId: adminId
    })

    res.json({
        message : "course Created"
    })
})

adminRouter.put("/course",adminMiddleware, async function(req, res){
    const adminId = req.userId;

    const { title, description, imgUrl, price } = req.body

    const course = await courseModel.updateOne({
        title: title ,
        description: description,
        imgUrl : imgUrl ,
        price : price,
        creatorId: adminId
    })

    res.json({
        message : "course Updated"
    })
})

adminRouter.get("/course/bulk", adminMiddleware , async function(req , res) {

    const courses = courseModel.find({});
    res.json({
        courses : courses
    })

})

module.exports = {
    adminRouter : adminRouter
}