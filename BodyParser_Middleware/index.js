const express=require('express')
const app=express()
const port=3000
const bodyParser=require('body-parser')

app.use(bodyParser.json())

function VoteMiddleWare(req,res,next){
    let age=req.body.age
    if(age>=18) next()
    else {
        let obj={
            age,
            err:"Age is less than 18 ok"
        }
        res.send(obj)
    }
}
app.use(VoteMiddleWare)


app.post('/Vote',(req,res)=>{res.send(`Applicable for Vote, Your age: ${req.body.age}`)})



app.listen(port)