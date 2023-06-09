import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose'
import morgan from 'morgan'

import authRoutes from './routes/auth.js'
import postRoutes from './routes/post.js'

/* Loading Env Variables */
dotenv.config();
const app = express();

/* establising connection between server and mongo */
mongoose
.connect(process.env.Mongo_URI)
.then(() => {console.log('Connected to RoamReveal db')})
.catch((error) => {console.log(`DB-ERROR : ${error}`)})

/* MiddleWares */
app.use(morgan("dev"));
app.use(express.json())

// router middleware
app.use("/api", authRoutes);
app.use("/api",postRoutes)

/* Starting a server */
app.listen(process.env.PORT , ()=> {
    console.log(`Server Started at localhost:${process.env.PORT}`)
})