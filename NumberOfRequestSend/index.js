const express=require('express')
const app=express()
const port=5000


let requests=0
function CountRequestsMiddleware(req,res,next){
    requests=requests+1
    
    next()
}
app.use(CountRequestsMiddleware)

app.get('*',(req,res)=>{
    res.send('Number of requests you send through http server are:'+requests)
})

app.listen(port,()=>{
    console.log('Server started on port: ',port);
})