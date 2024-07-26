const express=require("express")
const app = express();
const Router =require("./routers/userRouter")
const port = process.env.PORT||3005

app.use("/api",Router)



app.listen(port,()=>{console.log(`server is running at port ${port}`)});