const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 3000;
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const MongoURL =
  "mongodb+srv://mudasirirshad47:mudasir123456789@cluster0.jzcnrjw.mongodb.net/Contact_Management";

const userSignupSchema = new mongoose.Schema({
  name: String,
  number: Number,
});
const Contacts = new mongoose.Schema({
  name: String,
  number: Number,
});

const MySelf = mongoose.model("MySelf", userSignupSchema);
const MyContact = mongoose.model("MyContact", Contacts);
mongoose.connect(MongoURL);

app.post("/signup", async (req, res) => {
  const name = req.body.name;
  const number = req.body.number;
  const user = await MySelf.findOne({ number });
  if (user) {
    res.send("User exits");
  } else {
    const newUser = new MySelf({
      name,
      number,
    });
    newUser.save();
    res.send("User saved");}
})

const userTokenString = "This is my detail privacy string for JWT token";
function SignupMiddleware(req, res, next) {
  const name = req.body.name;
  const number = req.body.number;
  const user = MySelf.findOne({ number });
  if (user) {
    jwt.sign({ name, number }, userTokenString, (err, token) => {
      if (err) {
        res.send(err);
      } else {
        res.send({
          name,
          number,
          token,
        });
        next();
      }
    });
  } else {
    res.send("User not found");
  }
}
app.post('/login',SignupMiddleware ,function(req, res) {
  res.send("Welcome")
})
app.listen(port, () => {
  console.log("listening on port", port);
});
