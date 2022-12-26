const express=require('express');
const connectDB = require('./configs/db');
const propertyController=require('./controllers/property.controller');
const cors=require('cors');
const app=express();
app.use(express.json());
app.use(cors());

app.get("/",(req,res,next)=>{
  return res.send("Welcome to Home Page")
})


app.use('/api/properties',propertyController);
  

app.listen(5000,async()=>{
    try {
        await connectDB();
    } catch (error) {
        console.log("error",error);
    }
    console.log(`App is listening at port: http://localhost:5000`);
})