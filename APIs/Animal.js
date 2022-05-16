const sha1 = require('sha1');
const crypto = require('crypto');
// const fileUpload = require("express-fileupload");

const AnimalModel = require("../Models/Animal");

const GetAnimalListHandler = async (req, res) => {
    console.log("GET /animals");

    try {
        const docs = await AnimalModel.Animal.find();
        if (docs) {
            res.send(JSON.stringify(docs));
        } else {
            res.sendStatus(404);
        }

    } catch (err) {
        console.error(err);
        res.sendStatus(400);
    }
}

const GetAnimalByIdHandler = async (req, res) => {
    console.log("GET /animal/:id");
    console.log(req.params);

    try {
        const doc = await AnimalModel.Animal.findById(req.params.id);
        if (doc) {
            res.send(JSON.stringify(doc));
        } else {
            res.sendStatus(404);
        }

    } catch (err) {
        console.error(err);
        res.sendStatus(400);
    }
}


const PostAnimalHandler = async (req, res) => {
    console.log("POST /animal");
    console.log(req.body);

    try {
        const newAnimal = AnimalModel.Animal({
            name: req.body.name,
            description: req.body.description,
            photoUrls: [],
            tags: req.body.tags
        });

        const result = await newAnimal.save();
        res.send(JSON.stringify({ id: result._id }));
    } catch (err) {
        console.error(err);
        res.sendStatus(400);
    }

}

const UploadAnimalPhotoHandler = async (req, res) => {
    try {
        if (!req.files) {
            res.sendStatus(400);
        } else {
            let photo = req.files.photo;
            const photoUrl = "/photos/" + req.body.id + "/" + photo.name;

            const doc = await AnimalModel.Animal.findById(req.body.id)

            if (doc) {
                await photo.mv("." + photoUrl);

                doc.photoUrls = [photoUrl];

                await doc.save();
                res.sendStatus(201);
            } else {
                res.sendStatus(404);
            }
        }

    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

const PutAnimalHandler = async (req, res) => {
    console.log("PUT /animal");
    console.log(req.body);

    try {
        const doc = await AnimalModel.Animal.findById(req.body.id);
        if (doc) {
            const updateAnimal = {
                name: req.body.name,
                description: req.body.description,
                // photoUrls: [],
                tags: req.body.tags
            }
            const result = await AnimalModel.Animal.updateOne({ _id: req.body.id }, updateAnimal);
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }

    } catch (err) {
        console.error(err);
        res.sendStatus(400);
    }
}

const DeleteAnimalHandler = async (req, res) => {
    console.log("DELETE /animal");
    console.log(req.params);

    try {
        const doc = await AnimalModel.Animal.findById(req.body.id);
        if (doc) {
            const result = await AnimalModel.Animal.deleteOne({ _id: req.body.id});
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }

    } catch (err) {
        console.error(err);
        res.sendStatus(400);
    }
}

module.exports = {
    GetAnimalByIdHandler,
    GetAnimalListHandler,
    PostAnimalHandler,
    UploadAnimalPhotoHandler,
    PutAnimalHandler,
    DeleteAnimalHandler
}