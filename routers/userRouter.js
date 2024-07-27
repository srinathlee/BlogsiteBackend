import {Register,Login,userDetails} from "../controllers/userController.js"
import { isAuthorized } from "../middlewares/auth.js"
import express from "express"
const Router=express.Router()

Router.route("/register").post(Register)
Router.route("/login").post(Login)
Router.route("/profile").get(isAuthorized,userDetails)


export default Router