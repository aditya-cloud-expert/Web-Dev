const { Router } = require("express")
const courseRouter = Router()


courseRouter.post("/purchase", function(req , res){
    res.json({
        message : "hi"
    })
})


courseRouter.get("/preview", function(req , res){
    res.json({
        message : "hi"
    })
})

module.exports = {
    courseRouter: courseRouter
}