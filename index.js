import express from 'express';
import mongoose from 'mongoose'
import router from './router/taskRoute.js'
import cors from 'cors';
import auth_route from './router/authRoute.js';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.json({limit:"50mb"}))
app.use(bodyParser.urlencoded({limit:"50mb", extended: true }))

//middleware

//app.get('/protect',protect)
app.use('/',router);
app.use('/',auth_route)
// app.use('/uploads',express.static('uploads'))
mongoose.connect(process.env.MONGODB_URI,{ 
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    app.listen(5000,()=>{
        console.log("Server start");
    })
}).catch((error)=>{
    console.log(error);
})




