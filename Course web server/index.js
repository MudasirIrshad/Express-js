const express=require('express')
const app=express()
const port=3000
const bodyparser=require('body-parser')
app.use(bodyparser.json())

let Admin=[]
let course=[]

function adminMiddleWare(req,res,next){
    let login=false
    const {name,password}=req.body
    let admin=Admin.find(a => a.name==name && a.password==password)
    if(Admin.length==0){
        res.status(404).send('No Admin signed in');
    }
    else if(!admin){
        res.status(404).send('No Account found');
    }
    else if(admin){
        login=true
        if(login=true)next()
    }
}

app.post('/signup',(req,res,next)=>{
    const {name,password}=req.body

    console.log(Admin);
    if(Admin.length!=0){
        res.status(404).send('Admin Exits');
    }
    else if(name==undefined || password==undefined){
        res.status(404).send('Detail wrong')
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

let id=0
app.post('/course',(req,res)=>{
    const {name, description, price}=req.body
    id=id+1
    course.push({id,name,description,price})
    res.json(course)
})




app.listen(port)



