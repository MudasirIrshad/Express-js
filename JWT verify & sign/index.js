//  /signup ==> user can signup and get a token
//  /login ==> user can login using assigned token
//  /mydetail ==> user can get his detail with the help of assigned token
const express=require('express')
const app=express()
const port=3000
const bodyparser=require('body-parser')
const jwt= require('jsonwebtoken')

app.use(bodyparser.json())

let secretKey='JWT practice'




let USER=[]
app.post('/signup',(req,res)=>{
    const {name,gmail}=req.body
    let detail={
        name,gmail
    }    
    jwt.sign(detail,secretKey,(err,token)=>{

        if(token && detail.name!=='' && detail.gmail!==undefined){
            USER.push({name,gmail,token})
            res.send({
                name,gmail,token
            })
        }
        else{
            res.send('Error '+err)
        }
    })
})


function verifyLogin(req,res,next){
    let tkn=req.headers.authorization.split(" ")[1]
    let u=USER.find(i=>i.token==tkn)
    console.log(USER);
    if(u){
        next()
    }
    else{
        res.json({
            message:"User not found"
        }).status(401)
    }
}
app.post('/login',verifyLogin,(req,res)=>{
    
    res.send("Loged in successfull")

})


app.post('/forgotToken',(req,res)=>{
    let gmail=req.body.gmail
    let verifyGmail=USER.find(i=>i.gmail==gmail)
    if(verifyGmail){
        res.send(verifyGmail)
    }
    else{
        res.send('No user signed in from this gmail')
    }
}) 





app.listen(port,()=>{
    console.log('Server started');
})