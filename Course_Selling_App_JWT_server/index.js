const express=require('express')
const bodyparser=require('body-parser')
const port=3000
const jwt=require('jsonwebtoken')
const app=express()

app.use(bodyparser.json())
app.listen(port,()=>{
    console.log("Server Started at port: "+port);
})

const AdminSecretKey="JWT Course selling server"

const USER=[]
const Admin=[]
const Course=[]


app.post("/admin/signup",(req,res)=>{
    const {name,password}=req.body

    if(Admin.length>=1){
        res.status(401).send('Admin Exits')
    }
    else{
        jwt.sign({name,password},AdminSecretKey,(err,token)=>{
            if(err){
                res.json({err})
            }
            else{
                Admin.push({name,password,token})
                res.send({name,password,token})
                console.log(Admin);
            }
        })
    }
})

// -------------- ADMIN LOGIN ------------------------
function AdminAuthentication(req,res,next){
    let tkn=req.headers.authorization.split(' ')[1]
    let findToken=Admin.find(i=>i.token==tkn)
    if(findToken){
        next()
    }
    else{
        res.status(404).send("No Admin signed in")
    }
}
app.post('/admin/login',AdminAuthentication,(req,res)=>{
    res.send("Login Done")
})
// ---------------------------------------------------
app.get('/admin/users',AdminAuthentication,(req,res)=>{
    res.send(USER)
})
// ----------- Course Add, Detail --------------------
let id=0
app.post('/admin/courses',AdminAuthentication,(req,res)=>{
    id+=1
    const {title,description,price}=req.body
    Course.push({id,title,description,price})
    res.send({id,title,description,price})
})
app.get('/admin/courses',AdminAuthentication,(req,res)=>{
    res.send(Course)
})

app.put('/admin/course',AdminAuthentication,(req,res)=>{
    let id=req.query.id
    const {title,description,price}=req.body
    let course=Course.find(i=>i.id==id)
    if(course){
        Object.assign(course,{title,description,price})
        res.send(Course)
    }
    else{
        res.send('Course Not found')
    }
})
// ----------------------------------------------------
const UserSecretKey="I am a user"
app.post('/user/signup',(req,res)=>{
    const {name,gmail,password}=req.body
    let UserExit=USER.find(i=>(i.name && i.gmail && i.password)==(name && gmail && password))
    if(UserExit){
        res.send('Gmail is already signed up')
    }
    else{
        jwt.sign({name,gmail,password},UserSecretKey,(err,token)=>{
            if(err){
                res.json({err})
            }
            else{
                USER.push({name,gmail,password,purchasedCourses:[],token})
                res.send({name,gmail,password,token})
            }
        })
    }
})
function UserAuthentication(req,res,next){
    let tkn=req.headers.authorization.split(' ')[1]
    let User=USER.find(i=>i.token==tkn)
    if(User){
        next()
    }
    else{
        res.json({
            err:"Not found"
        })
    }
}

app.get('/user/login',UserAuthentication,(req,res)=>{
    res.send('User Logged in sucessfull')
})

app.get('/user/course',UserAuthentication,(req,res)=>{
    res.send(Course)
})


app.post('/user/course/',UserAuthentication,(req,res)=>{
    let id=Number(req.body.id)
    let tkn=req.headers.authorization.split(' ')[1]
    let pCourse=Course.find(i=>i.id==id)
    if(pCourse){
        let user=USER.find(i=>i.token==tkn)
        user.purchasedCourses.push(pCourse)
        res.send(user)
    }
    else{
        res.send('Course not found')
    }
})