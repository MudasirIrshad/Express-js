const fs=require('fs')
const express=require('express')
const bodyparser=require('body-parser')
const app=express()
const port=3000

app.use(bodyparser.json())
const filepath='data.json'

const existingData = fs.readFileSync(filepath, 'utf-8');

// Parse the JSON data into a JavaScript object
const existingObject = JSON.parse(existingData);



app.get('/todo',(req,res)=>{
    res.send(existingObject.todo)
})

app.post('/todo',(req,res)=>{
    let id=Math.floor(Math.random()*10000)
    let title=req.body.title
    let description=req.body.description
    let data={id,title,description}
    res.send(data)
    existingObject.todo.push(data);

    // Convert the updated object back to a JSON-formatted string
    const updatedJsonString = JSON.stringify(existingObject, null, 2);

    // Write the updated JSON string back to the file
    fs.writeFileSync(filepath, updatedJsonString, 'utf-8');
})

// deleting specific task
app.delete('/todo',(req,res)=>{
    let id=req.query.id
    let arr=existingObject.todo
    for(let i of arr){
        if(id==i.id){
            const index = arr.indexOf(i);
            console.log(index);
            arr.splice(index,1)
            res.send(`Deleted: {\nid: ${i.id}\ntitle: ${i.title}\ndescription: ${i.description}\n}`)
        }
    }

    const updatedJsonString = JSON.stringify(existingObject, null, 2);

    // Write the updated JSON string back to the file
    fs.writeFileSync(filepath, updatedJsonString, 'utf-8');
    
})


















app.listen(port)