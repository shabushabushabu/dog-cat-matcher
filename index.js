const express = require("express");
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');

const UserAPIs = require("./APIs/User");
const AnimalAPIs = require("./APIs/Animal");
const AuthenticationAPIs = require("./APIs/Authentication");
const SearchAPIs = require("./APIs/Search");

//----------- Initialisation -------------
const app = express();
const port = 4000;

const swaggerDocument = YAML.load("./swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use(fileUpload({
    createParentPath: true,
}))
app.use("/photos", express.static("photos"));

mongoose.connect('mongodb://localhost:27017/dogcatmatcher');

//----------- API endpoints --------------

app.get("/api/user/:userId", UserAPIs.GetUserHandler);
app.post("/api/user", UserAPIs.PostUserHandler);
app.put("/api/user", UserAPIs.PutUserDetailsHandler);
app.delete("/api/user", UserAPIs.DeleteUserHandler);

app.get("/api/animals", AnimalAPIs.GetAnimalListHandler);
app.get("/api/animal/:id", AnimalAPIs.GetAnimalByIdHandler);
app.post("/api/animal", AnimalAPIs.PostAnimalHandler);
app.put("/api/animal", AnimalAPIs.PutAnimalHandler);
app.delete("/api/animal", AnimalAPIs.DeleteAnimalHandler);

app.get("/api/search/:tag", SearchAPIs.SearchAnimalListHandler);


app.post("/api/login", AuthenticationAPIs.LoginHandler);

app.post("/api/uploadPhoto", AnimalAPIs.UploadAnimalPhotoHandler);

app.get("/api", (req, res) => {
    console.log("GET /api")
    res.sendStatus(200)
});


//------------ Start server ----------------
app.listen(port, () => {
    console.log("Server successfully started at " + port.toString()
    )
});