const express=require('express') // Importing express Module
const app=express() // using express
const port=3000 // initializing port for http server to run on it



function greeting(req,res){
    res.send('Welcome to the server on port: '+port)
}


// response on '/' route
app.get('/',greeting)

app.listen(port,()=>{
    console.log('Server started on port: '+port);
})