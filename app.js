
import express from "express"
import Router from "./routers/userRouter.js";
import Dbconfig from "./config/dbconfig.js";
const port = process.env.PORT||3005
const app = express()


app.use(express.json())
app.use("/api",Router)


Dbconfig()
app.listen(port,()=>{console.log(`server is running at port ${port}`)});