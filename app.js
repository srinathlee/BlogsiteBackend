
import express from "express"
import Router from "./routers/userRouter.js";
import BlogRouter from "./routers/blogRouter.js"
import Dbconfig from "./config/dbconfig.js";
import cors from "cors"
const port = process.env.PORT||3005
const app = express()

app.use(cors())
app.use(express.json())
app.use("/api",Router)
app.use("/api",BlogRouter)

Dbconfig()
app.listen(port,()=>{console.log(`server is running at port ${port}`)});