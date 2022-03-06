const sha1= require('sha1');
const crypto = require('crypto');

const AnimalModel = require("../Models/Animal");

const GetAnimalByIdHandler = async (req, res) => {
    console.log("GET /animal/:id");
    console.log(req.params);

    const id = req.params.id;

    const docs = await AnimalModel.Animal.findById(id);
    if (docs){
        console.log("Get animal details")
        res.send(JSON.stringify(docs));  
    } else{
        console.log("Animal not found")
        res.sendStatus(404);
    }
}

const GetAnimalListHandler = async (req, res) => {
    console.log("GET /animalList");

    const id = req.params.id;

    const docs = await AnimalModel.Animal.find();
    if (docs){
        console.log("Get animal list")
        res.send(JSON.stringify(docs));  
    } else{
        console.log("Animal not found")
        res.sendStatus(404);
    }
}

const PostAnimalHandler = async (req, res) => {
    console.log("POST /animal");
    console.log(req.body);

    const newAnimal = AnimalModel.Animal({
        name: req.body.name,
        description: req.body.description,
        photoUrls: [],
        tags: req.body.tags
    })

    const result = await newAnimal.save();
    res.send(JSON.stringify(result));  
}

module.exports = {
    GetAnimalByIdHandler,
    GetAnimalListHandler,
    PostAnimalHandler
}