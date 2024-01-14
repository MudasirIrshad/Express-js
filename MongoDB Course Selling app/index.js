const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const mongoose = require('mongoose');
const jwt=require('jsonwebtoken')
app.use(bodyParser.json());

const URL = 'mongodb+srv://Mudasir_Irshad:helloworld@cluster0.kycetgt.mongodb.net/test';
mongoose.connect(URL)

const adminSingupSchema=new mongoose.Schema({
    name:String,
    password:String
})
const AdminSignup=mongoose.model('AdminSignup',adminSingupSchema)

const userSignupSchema=new mongoose.Schema({
    name:String,
    gmail:String,
    password:String
})
const UserSignup=mongoose.model('UserSignup',userSignupSchema)



app.listen(port,()=>{
    console.log("Server Started at port: "+port);
})

const AdminSecretKey="JWT Course selling server"
app.post("/admin/signup",async(req,res)=>{
    const {name,password}=req.body
    let findAdmin=await AdminSignup.findOne({name})
    if(findAdmin){
        res.status(401).send('Admin Exits')
    }
    else{
        const newAdmin=new AdminSignup({
            name,password
        })
        jwt.sign({name,password},AdminSecretKey,(err,token)=>{

            res.send({name,password,token})
        })
        newAdmin.save()
        
    }
})

// -------------- ADMIN LOGIN ------------------------
const AdminAuthentication = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).send('Access denied. No token provided.');

    jwt.verify(token, AdminSecretKey, (err, decoded) => {
        if (err) return res.status(401).send('Invalid token.');
        req.user = decoded;
        next();
    });
};
app.post('/admin/login',AdminAuthentication,(req,res)=>{
    res.send("Login Done")
})
