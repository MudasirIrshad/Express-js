const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = 3000
const jwt = require('jsonwebtoken')
const bodyParser=require('body-parser')


app.listen(port, ()=>{
    console.log('listening on port',port);
})