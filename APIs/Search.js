const AnimalModel = require("../Models/Animal");
AnimalModel.animalSchema.index({tags: 'text'})

const SearchAnimalListHandler = async (req, res) => {
    console.log("GET /search/:tag");

    const tag = req.params.tag;

    const docs = await AnimalModel.Animal.find({
        $text: {
            $search: tag
        }
    });
    if (docs){
        console.log("Get animal list")
        res.send(JSON.stringify(docs));  
    } else{
        console.log("Search not found")
        res.send(JSON.stringify(docs)); 
    }
}


module.exports = {
    SearchAnimalListHandler
}