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
        else if(files.length==0){
            res.send('Directory is Empty')
        }
        else{
            res.send(files)
        }
      });
}
app.get('/files',file)




app.listen(port,()=>{console.log('Server Started on port: '+port);})