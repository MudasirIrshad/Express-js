const express=require('express')
const app=express()
const port=5000

let countGuess=0
let mainGuess=5

let GuessCheck=(req,res,next)=>{
    countGuess++
    if(countGuess==3){
        res.send('You lose, You Reached the limit of Guess')
        countGuess=0
    }
    else{
        next()
    }
}
app.use(GuessCheck)

app.get('/GuessGame',(req,res)=>{
    if(req.query.guess<mainGuess){
        res.send('Guessed number is Smaller than you guess')
    }
    else if(req.query.guess>mainGuess){
        res.send('Your Guess is Grator than the orginal guess.')
    }
    else{
        res.send('YOU WON...')
    }
})

app.listen(port,()=>{console.log(`Server started at port: ${port}`);})