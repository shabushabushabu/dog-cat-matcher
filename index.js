const express = require("express");
const mongoose = require('mongoose');

const UserAPIs = require("./APIs/User");
const AnimalAPIs = require("./APIs/Animal");
const AuthenticationAPIs = require("./APIs/Authentication");
const SearchAPIs = require("./APIs/Search");

//----------- Initialisation -------------
const app = express();
const port = 4000;

app.use(express.json());
app.use(express.static("photos"));

mongoose.connect('mongodb://localhost:27017/dogcatmatcher');

//----------- API endpoints --------------

app.get("/api/user/:email", UserAPIs.GetUserHandler)
app.post("/api/user", UserAPIs.PostUserHandler)
app.put("/api/user/:email", UserAPIs.PutUserDetailsHandler)
app.delete("/api/user/:email", UserAPIs.DeleteUserHandler)

app.get("/api/animal/:id", AnimalAPIs.GetAnimalByIdHandler)
app.get("/api/animalList", AnimalAPIs.GetAnimalListHandler)
app.post("/api/animal", AnimalAPIs.PostAnimalHandler)
app.put("/api/animal/:id", AnimalAPIs.PutAnimalHandler)
app.delete("/api/animal/:id", AnimalAPIs.DeleteAnimalHandler)

app.get("/api/search/:tag", SearchAPIs.SearchAnimalListHandler)


app.post("/api/login", AuthenticationAPIs.LoginHandler)              

app.get("/api", (req, res) => {
    console.log("GET /api")
    res.sendStatus(200)
});


//------------ Start server ----------------
app.listen(port, () => {
    console.log("Server successfully started at " + port.toString()
    )});