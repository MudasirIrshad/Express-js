const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const mongoose = require('mongoose');
const jwt=require('jsonwebtoken')
app.use(bodyParser.json());

const URL = 'mongodb+srv://Mudasir_Irshad:helloworld@cluster0.kycetgt.mongodb.net/test';

mongoose.connect(URL);

const userSignupSchema = new mongoose.Schema({
  name: String,
  gmail: String,
  password: String
});


const UserSignup = mongoose.model('UserSignup', userSignupSchema);

app.post('/signup', async (req, res) => {
  const { name, gmail, password } = req.body;
  let find=await UserSignup.findOne({name,gmail})
  if(find){
    res.send("User exits")
  }
  else{
    const newUser = new UserSignup({
        name,
        gmail,
        password
      });
      res.send("Done")
      newUser.save();
  }
  
});
let secretKey='user secret key'
app.post('/login',async (req, res) => {
  const { name, gmail, password } = req.body;

    let find=await UserSignup.findOne({ name, gmail, password });
    if(find){
        jwt.sign({ name, gmail, password },secretKey,(err,token)=>{
            if(err){
                res.send(err)
            }
            else{
                res.send({
                    name,gmail,token
                })
            }
        })
    }
});

app.listen(port, () => {
  console.log('Server started at port: ' + port);
});
