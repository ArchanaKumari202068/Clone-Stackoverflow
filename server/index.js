import express from 'express'
//we can create database and do CRUD opr using Mongoose
import mongoose from 'mongoose'
//
import cors from 'cors'
import userRoutes from './routes/users.js'
import questionRoutes from './routes/Questions.js'


// we create our server
const app= express();
//we will recieve only through json and limit 30mb bt we can extend
app.use(express.json({limit:"30mb", extended:true}))
app.use(express.urlencoded({limit:'30mb',extended:true}))
app.use(cors());
app.get('/',(req,res) =>{
    res.send("This is a stack overflow clone API")
})
app.use('/user',userRoutes)
app.use('/questions',questionRoutes)
const PORT = process.env.PORT || 5000

const CONNECTION_URL = "mongodb+srv://archanakumari202068:202068@stackoverflow-clone.rhh4ud3.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(() =>app.listen(PORT,()=>{console.log(`server running on post ${PORT}`)}))
.catch((err)=> console.log("Error: ",err.message))