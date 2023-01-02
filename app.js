// basic import...
const express=require('express');
const router=require('./src/routes/api')
const app=new express();
const bodyParser= require('body-parser');


// security middleware...
const rateLimit=require('express-rate-limit')
const helmet=require('helmet');
const mongoSanitize=require('express-mongo-sanitize')
const xss=require('xss-clean');
const hpp=require('hpp');
const cors=require('cors');

app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({limit:"50mb"}))


// Database...
const mongoose=require('mongoose');


// Implement Security Middleware
app.use(cors());
app.use(hpp());
app.use(xss());
app.use(mongoSanitize());
app.use(helmet());


// body parser Implement...
app.use(bodyParser.json());


//request rate limit...
const limiter=rateLimit({windowMs:15*60*1000,max:3000})
app.use(limiter);


//Mongodb connection...
let URI="mongodb+srv://<username>:<password>@cluster0.l3mtknu.mongodb.net/task_manager?retryWrites=true&w=majority";
let OPTION={user:'rsroki2022',pass:'AaBbCc2580!!@@',autoIndex:true}

mongoose.connect(URI,OPTION,(err)=>{
    console.log('Connection Success')
    console.log(err)
})


//Routing Impliment...
app.use("/api/v1",router)


//undefined Route Implement
app.use("*",(req,res)=>{
    res.status(404).json({status:"fail",data:"Not Found"})
})


module.exports=app;