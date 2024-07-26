const {register} =require("../controllers/userController")
const express=require('express')
const Router=express.Router()

Router.route("/register").post(register)

module.exports=Router