const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const mongoose = require('mongoose');
const jwt=require('jsonwebtoken')
app.use(bodyParser.json());

const URL = 'mongodb+srv://Mudasir_Irshad:helloworld@cluster0.kycetgt.mongodb.net/test';
mongoose.connect(URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true})

const adminSingupSchema=new mongoose.Schema({
    name:String,
    password:String
})
const AdminSignup=mongoose.model('AdminSignup',adminSingupSchema)

const userSignupSchema=new mongoose.Schema({
    name:String,
    gmail:String,
    password:String,
    purchaseCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'courseAdd' }]
})
const UserSignup=mongoose.model('UserSignup',userSignupSchema)

const courseAddSchema=new mongoose.Schema({
    title:String,
    description:String,
    price:Number
})
const courseAdd=mongoose.model('courseAdd',courseAddSchema)

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
// ---------------------------------------------------
app.get('/admin/users',AdminAuthentication,async (req,res)=>{
    const users=await UserSignup.find()
    res.json(users)
})
// ----------- Course Add, Detail --------------------

app.post('/admin/courses',AdminAuthentication,(req,res)=>{

    const {title,description,price}=req.body
    const newCourse=new courseAdd({
        title,description,price
    })
    newCourse.save()
    res.send({title,description,price})
})
app.get('/admin/courses',AdminAuthentication,async (req,res)=>{
    const courses=await courseAdd.find()
    res.json({courses})
})
// ----------------------------------------------------
const UserSecretKey="I am a user"
app.post('/user/signup',async (req,res)=>{
    const {name,gmail,password,purchaseCourses}=req.body
    let UserExit=await UserSignup.findOne({gmail})
    if(UserExit){
        res.send('Gmail is already signed up')
    }
    else{
        jwt.sign({name,gmail,password},UserSecretKey,(err,token)=>{
            if(err){
                res.json({err})
            }
            else{
                const newUser=new UserSignup({
                    name,gmail,password,purchaseCourses
                })
                newUser.save()
                res.send({message: "Signed up done",token})
            }
        })
    }
})
function UserAuthentication(req,res,next){
    let token=req.headers.authorization.split(' ')[1]
    if (!token) return res.status(401).send('Access denied. No token provided.');

    jwt.verify(token, UserSecretKey, (err, decoded) => {
        if (err) return res.status(401).send('Invalid token.');
        req.user = decoded;
        next();
    });

}

app.post('/user/login',UserAuthentication,(req,res)=>{
    res.send('User Logged in sucessfull')
})

app.get('/user/course',UserAuthentication,async (req,res)=>{
    let courses=await courseAdd.find()
    res.json({
        courses
    })
})


app.post('/user/purchaseCourse',UserAuthentication,async (req,res)=>{
    let id=req.body.id
    let pCourse=await courseAdd.findById(id)
    let gmail=req.user.gmail
    let user=await UserSignup.findOne({gmail})

    if(pCourse){
        user.purchaseCourses.push(pCourse._id)
        user.save()
    }
    res.send(user)
})