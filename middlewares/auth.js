import User from "../models/userModel.js"
import jwt from "jsonwebtoken"


export const isAuthorized=async(req,res,next)=>{
    const headers=req.headers['authorization']
    if(!headers){
    //  return next(new errorHandler("no jwtToken provided unauthorised ",401))
    return res.status(401).json({ message: "no jwtToken provided unauthorised" });


    }   
    const jwtToken=headers.split(" ")[1]
    if(!jwtToken){
     return next(new errorHandler("login to access this resource",401))
    return res.status(401).json({ message: "login to access this resource" });

    }
    const {id}=jwt.verify(jwtToken,"jadlfkjasdlkfjaslkdflakjsfl")
    const user=await User.findById(id)
    req.user=user
    next()
 };
 