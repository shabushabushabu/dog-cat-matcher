const express = require("express");
const app = express();
const port = 4000
const mongoose = require('mongoose');
const sha1= require('sha1');

// const attachUserApis = require("attachUserApis")

app.use(express.json())

// attachUserApis(app)

async function main() {
    await mongoose.connect('mongodb://localhost:27017/test');

}

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    hashPassword: String,
    salt: String
  });

const User = mongoose.Model("User", userSchema)

app.get("/", (req, res) => {
    console.log("HELLO CORGI")
    res.send("SHABU")
});
                // params
app.get("/user/:name", async(req, res) => {
    // //http:/localhost:4000/user/name/shabu
    console.log("GET /user");
    console.log(req.params);
    const userName = req.params.name;

    const docs = await User.findOne({name: userName})
    if (docs){
        res.send(JSON.stringify({
            id: docs.id,
            name: docs.name,
            email: docs.email
        }));  
    } else{
        res.sendStatus(404)
    }
    
    res.send("User details");
    // get user by name
});


app.post("/user", async (req, res) => {
    console.log("POST /user")
    console.log(req.body)
    console.log("Create new user")
    // await asynccccccc!!!!!!!!!!!
    const docs = await User.find()
    // promise
    User.find().then(() => {

    })
    // callback
    // check existing users
    User.find({name: req.body.name}, (err, docs)=> {
        console.log(docs)
        if (docs.length >0){
            res.sendStatus(403) // 400
            return
        } else {
            const salt = "Random"

        }
    })

    // add user to db
    const newUser = User({
        name: req.body.name,
        email: req.body.email,
        hashPassword: sha1(req.body.hashPassword),
        salt: salt
    })

    newUser.save(()=> {
        // send back
        res.send(JSON.stringify({
            "result": "success",
            "userId": "ID"
        }))

    })
    
});
// update
app.put("/user", (req, res) => {
    res.sendStatus(200)

});

app.post("/login", async (req, res) => {
    const user = await User.findOne({email: req.body.email})
    if (user){
        const hashPassword = user.hashPassword;
        const salt = user.salt;
        const attemptPassword = req.body.hashPassword
        if (sha1(attemptPassword+salt)== hashPassword){
            res.send({
                "message": "success",
                "token": shar1(JSON.stringify({
                    name: user.name,
                    email: user.email
                }))
            })
        }
    }
})




// client requests -> server middleware1 (app.use("sth") -> server (app.get("/"))) send response
// middleware -> authen, json pasrsing => cut off separation of concern, abstract logic
app.listen(port, () => {
    console.log("Server successfully started at " + port.toString()
    )});