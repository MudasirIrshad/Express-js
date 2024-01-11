const express=require('express')
const bodyparser=require('body-parser')
const port=3000
const jwt=require('jsonwebtoken')
const app=express()

app.use(bodyparser.json())
app.listen(port,()=>{
    console.log("Server Started at port: "+port);
})

const SecretKey="JWT Course selling server"

const USER=[]
const Admin=[]
const Course=[]


app.post("/admin/signup",(req,res)=>{
    const {name,password}=req.body

    if(Admin.length>=1){
        res.status(401).send('Admin Exits')
    }
    else{
        jwt.sign({name,password},SecretKey,(err,token)=>{
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
// ----------------------------------------------------