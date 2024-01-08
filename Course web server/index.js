/*
Admin Routes:
    /admin/signup => Creates Admin 
    /admin/login => Login the Admin
    /admin/course => Add the new Courses
    /admin/userDetails => View the Detail of the users

User routes:
    /user/signup => Make account of user
    /user/login => Login the user
    /user/purchaseCOurse => User can purchase course WRT course ID
    /user/editDetail => User can edit his/her account detail (name, password) only

Extra Routes:
    /allCourses => See the complete courses which are offered
*/

const express=require('express')
const app=express()
const port=3000
const bodyparser=require('body-parser')
app.use(bodyparser.json())

let Admin=[]
let course=[]
let user=[]


function adminSignup(req,res,next){
    const {name,password}=req.body
    let admin=Admin.find(u=> u.name==name && u.password==password)
    if(admin){
        res.status(404).send("user already exits")
    }
    else if(Admin.length>=1){
        res.status(401).send("Admin Exits")
        console.log(Admin);
    }
    else{
       Admin.push({name,password})
       next()
    }
}
function adminLogin(req,res,next){
    const {name,password}=req.headers
    let admin=Admin.find(u=> u.name==name && u.password==password)
    if(admin){
        next()
    }
    else{
        if(Admin.length==0){
            res.status(404).send("No admin Signed up")
        }
        else{
            res.status(404).send("Detail not matched")
        }

    }
}

app.post('/admin/signup',adminSignup,(req,res)=>{
    res.send("Signup successfull")
})

app.post('/admin/login',adminLogin,(req,res)=>{
    res.send('Loged in')
})

let id=0
app.post('/admin/course',adminLogin,(req,res)=>{
    const {name, description, price}=req.body
    id=id+1
    course.push({id,name,description,price})
    res.json(course)
})

app.get('/allCourses',(req,res)=>{
    res.send(course)
})

app.put('/course/:id',adminLogin,(req,res)=>{
    const {name, description, price}=req.body
    let id=Number(req.params.id)

    for(let i of course){
        if(i.id==id){
            Object.assign(i,{id,name,description,price})
            res.send(course)
            break;
        }
    }
})

app.get('/admin/userDetails',adminLogin,(req,res)=>{
    res.json(user)
})




// USER SERVER START HERE
function signupMiddleware(req,res,next){
    const {name,gmail,password}=req.body
    let User=user.find(u=> u.gmail==gmail)
    if(User){
        res.status(404).send("user already exits")
    }
    else{
        user.push({name,gmail,password,purchasedCourses:[]})
        next()
    }
}
function loginMiddleware(req,res,next){

    const {name,gmail,password}=req.headers
    let User=user.find(u=> u.gmail==gmail && u.name==name && u.password==password)
    if(User){
        next()
    }
    else{
        res.status(404).send("User not signed up")
    }
}

app.post('/user/signup',signupMiddleware,(req,res)=>{
    res.send("Signed up successfull")
})
app.post('/user/login',loginMiddleware,(req,res)=>{
    res.send("Loged in successfull")
})
app.post('/user/purchaseCourse',loginMiddleware,(req,res)=>{
    const {name,gmail,password}=req.headers
    let courseID=Number(req.body.id)
    
    let Course=course.find(c=>c.id==courseID)
    for(let i of user){
        if(i.gmail==gmail){
            i.purchasedCourses.push({Course})
            res.send(i)
            break;
        }
    }
})

app.put('/user/editDetail',loginMiddleware,(req,res)=>{
    let gmail=req.query.gmail
    const {name, password}=req.body
    for(let i of user){
        if(i.gmail==gmail){
            Object.assign(i,{name,password})
            res.send(user)
            break;
        }
    }
})
app.listen(port)



