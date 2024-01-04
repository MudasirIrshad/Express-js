const express=require('express')
const app=express()
const port=3000
const bodyparser=require('body-parser')
app.use(bodyparser.json())

let Admin=[]
let course=[]

function adminMiddleWare(req,res,next){
    const {name,password}=req.body
    let admin=Admin.find(a => a.name=name && a.password==password)
    console.log(admin);
    if(Admin.length==0){
        res.status(404).send('No Admin signed in');
    }
    else if(admin){
        next()
    }
}

app.post('/signup',(req,res,next)=>{
    const {name,password}=req.body
    let admin=Admin.find(a => a.name=name && a.password==password)
    console.log(admin);
    if(admin){
        if(Admin.length!=0){
            res.status(404).send('Admin Exits');
        }
    }
    else{
        Admin.push({name,password})
        next()
    }
},(req,res)=>{
    res.send('Singup successfully')
})
app.post('/login',adminMiddleWare,(req,res)=>{
    res.send('Loged in')
})










app.listen(port)



