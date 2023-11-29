/*
Problem: Query Parameter Validation Middleware

You are building an Express.js application that handles information about books. Each book in your database has an ISBN (International Standard Book Number). Your application has a route that retrieves book details based on the provided ISBN as a query parameter.

However, you want to ensure that the provided ISBN is valid before processing the request. Create a middleware function named validateISBN that checks if the ISBN provided in the query parameter is a valid 10 or 13 digit ISBN.

Your middleware should do the following:

Check if the isbn query parameter is present in the request.
If the isbn parameter is present, check if it is a valid 10 or 13 digit ISBN.
If the ISBN is valid, call the next middleware in the stack.
If the ISBN is not valid, send a response with a 400 status code and a message indicating that the provided ISBN is invalid.
Example:

If a user makes a request to /book?isbn=1234567890, the middleware should recognize that the ISBN is valid and pass the control to the next middleware or route handler.

If a user makes a request to /book?isbn=invalidisbn, the middleware should respond with a 400 status code and a message like "Invalid ISBN provided."
*/

const express = require('express')
const app = express()
const port = 3000


function validateISBN(req,res,next){
    let ISBN=req.query.isbn
    if(Number(ISBN) &&(ISBN.length==10 || ISBN.length==13)) next() 
    else{
        res.status(400).send('Invalid ISBN provided')
        
    }
}
app.use(validateISBN)
app.get('/book',(req,res)=>{
    res.send('book section');
})



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})