const express = require("express");
const mongoose = require('mongoose');

const UserAPIs = require("./APIs/User");
const AuthenticationAPIs = require("./APIs/Authentication");

//----------- Initialisation -------------
const app = express();
const port = 4000;

app.use(express.json());
app.use(express.static("photos"));

mongoose.connect('mongodb://localhost:27017/dogcatmatcher');

//----------- API endpoints --------------

app.get("/user/:email", UserAPIs.GetUserHandler)
app.post("/user", UserAPIs.PostUserHandler)

app.post("/login", AuthenticationAPIs.LoginHandler)              

app.get("/", (req, res) => {
    console.log("GET /")
    res.sendStatus(200)
});


//------------ Start server ----------------
app.listen(port, () => {
    console.log("Server successfully started at " + port.toString()
    )});