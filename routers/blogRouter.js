import {CreateBlog,GetBlog,GetAllBlogs,WriteComment,SaveBlog,LikeBlog,userLikeBlogs} from "../controllers/blogController.js"
import { isAuthorized } from "../middlewares/auth.js"
import express from "express"
const BlogRouter=express.Router()

BlogRouter.route("/createblog").post(isAuthorized,CreateBlog)
BlogRouter.route("/blogs/:id").get(isAuthorized,GetBlog)
BlogRouter.route("/blogs").get(isAuthorized,GetAllBlogs)
BlogRouter.route("/blogs/comment/:id").post(isAuthorized,WriteComment)
BlogRouter.route("/blogs/save/:id").post(isAuthorized,SaveBlog)
BlogRouter.route("/blogs/:id").post(isAuthorized,LikeBlog)
BlogRouter.route("/blogs/user/liked").get(isAuthorized,userLikeBlogs)








export default BlogRouter