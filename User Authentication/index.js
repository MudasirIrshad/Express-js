const express=require('express')
const app=express()
const port=3000
const bodyparser=require('body-parser')

app.use(bodyparser.json())




let user=[]
function signup(req,res){
    let name=req.body.name
    let email=req.body.email
    let password=req.body.password
    user.push({name,email,password})
    res.send(`Signup Done   -->  ${[name,email,password]}`)
}
app.post('/signup',signup)


let adminPass=7860
function AdminVerification(req,res,next){
    if(req.query.pass==adminPass){
        next()
    }
    else{
        res.status(401).send('Password Not match');
    }
}
app.use('/userdetailAdmin',AdminVerification)
app.get('/userdetailAdmin',(req,res)=>{res.send(user)})


function loginpage(req,res,next){
    let name=req.body.name
    let email=req.body.email
    let password=req.body.password
    let obj={name,email,password}

    if(user.length==0){
        res.send('No user signe up yet')
    }
    else{
        for(let i of user){
            if(JSON.stringify(i) === JSON.stringify(obj)){
                next()
                break
            }
        }
    }
}
app.use('/login',loginpage)
app.get('/login',(req,res)=>{
    res.send(`Welcome to page`)
})



app.get('/',(req,res)=>{res.send('For SignUp page: /signup')})
app.listen(port,()=>{console.log('Started at port: '+port);})