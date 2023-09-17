import express from 'express'
//we can create database and do CRUD opr using Mongoose
import mongoose from 'mongoose'
//
import cors from 'cors'
import dotenv from 'dotenv'
import userRoutes from './routes/users.js'
import questionRoutes from './routes/Questions.js'
import answerRoutes from './routes/Answers.js'

// we create our server
const app= express();
dotenv.config();
//we will recieve only through json and limit 30mb bt we can extend
app.use(express.json({limit:"30mb", extended:true}))
app.use(express.urlencoded({limit:'30mb',extended:true}))
app.use(cors());
app.get('/',(req,res) =>{
    res.send("This is a stack overflow clone API")
})
app.use('/user',userRoutes)
app.use('/questions',questionRoutes)
//to post answer
app.use('/answer',answerRoutes)
const PORT = process.env.PORT || 5000

// const DATABASE_URL = "mongodb+srv://..."
const DATABASE_URL = process.env.CONNECTION_URL

mongoose.connect(DATABASE_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(() =>app.listen(PORT,()=>{console.log(`server running on post ${PORT}`)}))
.catch((err)=> console.log("Error: ",err.message))