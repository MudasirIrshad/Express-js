const express=require('express')
const app=express()
const port=3000
const fs=require('fs')

function file(req,res){
    const folderPath = './file';
    fs.readdir(folderPath, (err, files) => {
        if (err) {
          res.send(err)
          return;
        }
        else{
            res.send(files)
        }
      });
}
app.get('/files',file)


app.get('/fileContent',(req,res)=>{
    let filename=req.query.name
    fs.readFile(`./file/${filename}`,'utf8',(err,data)=>{
        if(err){
            res.send(err)
        }
        else{
            res.send(data)
        }
    })
})

app.get('*',(req,res)=>{
    res.status(404).send('Route Not found')
})


app.listen(port,()=>{console.log('Server Started on port: '+port);})