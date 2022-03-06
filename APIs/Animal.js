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

const PutAnimalHandler = async (req, res) => {
    console.log("PUT /animal/:id");
    console.log(req.body);

    const id = req.params.id;

    const updateAnimal = {
        name: req.body.name,
        description: req.body.description,
        photoUrls: [],
        tags: req.body.tags
    }
    // TODO check exist
    const result = await AnimalModel.Animal.updateOne({_id: id}, updateAnimal);
    res.send({
        "message": "success",
        "status": "animal updated"
    });   
}

const DeleteAnimalHandler = async (req, res) => {
    console.log("DELETE /animal/:id");
    console.log(req.params);

    const id = req.params.id;
    
    // TODO check exist
    const result = await AnimalModel.Animal.deleteOne({_id: id});
    res.send({
        "message": "success",
        "status": "animal deleted"
    });
}

module.exports = {
    GetAnimalByIdHandler,
    GetAnimalListHandler,
    PostAnimalHandler,
    PutAnimalHandler,
    DeleteAnimalHandler
}