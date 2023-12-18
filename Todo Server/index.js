const express=require('express')
const bodyparser=require('body-parser')
const app=express()
const port = 3000
app.use(bodyparser.json())

let todo=[]

app.use('/addtodo',(req,res,next)=>{
    if((req.body.name.length===0 || req.body.description.length===0)){
        res.send('Add Name and description of the task please')
    }
    else{
        next()
    }
})
app.post('/addtodo',(req,res)=>{
    let todoname=req.body.name
    let tododes=req.body.description
    let id=Math.floor(Math.random() * 100000)
    todo.push({id,todoname,tododes})
    res.send(`Your todo Task:\n Task Name: ${todoname}\n Task Description: ${tododes}` )
})


app.use('/gettodo',(req,res,next)=>{
    if(todo.length==0){
        res.send('No todo task still added')
    }
    else{
        next()
    }
})
app.get('/gettodo',(req,res)=>{
    res.send(todo)
})




app.get('/todo:id',(req,res)=>{
    let task=[]
    for(let i of todo){
        if(req.query.id==i.id){
            task.push(i)
            break
        }
    }
    if(task.length==0){
        res.send('Not found')
    }
    else{
        res.send(task)
    }
})


app.delete('/deletetodo',(req,res)=>{
    let id=req.query.id
    for(let i of todo){
        if(id==i.id){
            let indexOFi=todo.indexOf(i)
            todo.splice(indexOFi,1)
            res.send('Deleted')
            break
        }
    }
})








app.listen(port,()=>{
    console.log(`Server started on port: ${port}`);
})