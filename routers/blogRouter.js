// import {Register,Login,userDetails} from "../controllers/userController.js"
import { isAuthorized } from "../middlewares/auth.js"
import express from "express"
const Router=express.Router()

Router.route("/create").post(Register)
Router.route("/blogs").get(Login)
Router.route("/blog/id").get(isAuthorized,userDetails)


export default Router