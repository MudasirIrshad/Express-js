const express=require('express') // Importing express Module
const app=express() // using express
const port=3000 // initializing port for http server to run on it



function Welcome(req,res){
    res.send('Welcome to the server on port: '+port)
}


// pass numbers through query in http server url "localhost:3000/sum?num1=5&num2=5"
function Sum(req,res){
    let num1=parseInt(req.query.num1)
    let num2=parseInt(req.query.num2)

    if(!Number(num1) || !Number(num2)){
        res.status(400).send('Both query parameters must be number')
    }
    else
        res.send(`${num1} + ${num2} : ${num1+num2}`)
}

// response on '/' route
app.get('/',Welcome)

// Sum function on '/sum' route
app.get('/sum',Sum)


app.listen(port,()=>{
    console.log('Server started on port: '+port);
})