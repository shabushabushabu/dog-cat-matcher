const sha1= require('sha1');
const crypto = require('crypto');

const UserModel = require("../Models/User");

const GetUserHandler = async (req, res) => {
    console.log("GET /user/:email");
    console.log(req.params);

    const userEmail = req.params.email;

    const docs = await UserModel.User.findOne({email: userEmail})
    if (docs){
        console.log("Get user details")
        res.send(JSON.stringify({
            id: docs.id,
            name: docs.name,
            email: docs.email
        }));  

    } else{
        console.log("User not exist")
        res.sendStatus(404);
    }
}

const PostUserHandler = async (req, res) => {
    console.log("POST /user");
    console.log(req.body);

    // check existing users - callback , promise (then...), await
    const userEmail = req.body.email;

    const docs = await UserModel.User.find({email: userEmail})
    console.log(docs)
    if (docs.length > 0) {
        console.log("User Existed")
        res.sendStatus(403)
        return   
    } else {
        console.log("Create new user")
        const salt = crypto.randomBytes(128).toString('base64');
        const newUser = UserModel.User({
            name: req.body.name,
            email: userEmail,
            hashPassword: sha1(req.body.password + salt),
            salt: salt
        });

        console.log("Add new user to DB")
        const result = await newUser.save()
        res.send(JSON.stringify({
            "result": "success",
            "userId": result._id.toString()
        }));
    }
}

module.exports = {
    GetUserHandler,
    PostUserHandler
}