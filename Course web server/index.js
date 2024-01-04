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
    if(admin){
        res.status(404).send('Admin Already Exit');
    }
    else{
        Admin.push({name,password})
        next()
    }
}

app.post('/singup',adminMiddleWare,(req,res)=>{
    res.send('Singup successfully'+Admin[0])
})
app.listen(port)



