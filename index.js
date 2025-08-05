
import express from "express"
import Router from "./routers/userRouter.js";
import BlogRouter from "./routers/blogRouter.js"
import Dbconfig from "./config/dbconfig.js";
import cors from "cors"
import passport from 'passport';
import './config/passport.js';
import authRoutes from './routers/authRoutes.js';
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT
const app = express()

app.use(cors())
app.use(express.json())
app.use(passport.initialize());
app.use('/api/auth', authRoutes);
app.use("/api",Router)
app.use("/api",BlogRouter)

Dbconfig()
app.listen(port,()=>{console.log(`server is running at port ${port}`)});
