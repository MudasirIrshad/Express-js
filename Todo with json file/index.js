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

















app.listen(port)