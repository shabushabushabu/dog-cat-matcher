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
            email: docs.email,
            birthdate: docs.birthdate,
            occupation: docs.occupation
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
            birthdate: new Date(req.body.birthdate),
            occupation: req.body.occupation,
            hashPassword: sha1(req.body.password + salt),
            salt: salt
        });

        console.log("Add new user to DB")
        const result = await newUser.save()
        res.send(JSON.stringify({
            "result": "success",
            "status": "user created",
            "userId": result._id.toString()
        }));
    }
}

const PutUserDetailsHandler = async (req, res) => {
    console.log("PUT /user/:email"); // Should this be ID??
    console.log(req.body);

    const userEmail = req.params.email;

    const updateUser = {
        name: req.body.name, 
        birthdate: new Date(req.body.birthdate), 
        occupation: req.body.occupation
    };
    // const docs = await UserModel.User.findOne({email: userEmail}) // TODO is this necessary - perf
    // if (docs){
    //     console.log("Update user to DB")
    //     const result = await UserModel.User.updateOne(
    //         {email: userEmail}, 
    //         {name: req.body.name, 
    //         birthdate: new Date(req.body.birthdate), 
    //         occupation: req.body.occupation});
    //     res.send(JSON.stringify({
    //         "result": "success",
    //         "status": "user details updated"
    //     }));
    // } else{
    //     console.log("User not exist");
    //     res.sendStatus(404);
    // }
    const result = await UserModel.User.findOneAndUpdate({email: userEmail}, updateUser);
    console.log(result)
    res.send(JSON.stringify({
        "result": result
    }));
    

}

const DeleteUserHandler = async (req, res) => {
    console.log("DELETE /user/:email");
    console.log(req.body);
    
    const userEmail = req.params.email;

    const user = await UserModel.User.findOne({email: userEmail})
    if (user) {
        const hashPassword = user.hashPassword; // confirm password
        const salt = user.salt;

        const attemptPassword = req.body.password
        if (hashPassword == sha1(attemptPassword + salt)) {
            // delete user
            const result = await UserModel.User.deleteOne({email: userEmail})
            res.send({
                "message": "success",
                "status": "user deleted"
            });
        } else {
            console.log("Incorrect password")
            res.sendStatus(401)
        }
    } else {
        console.log("User not exist");
        res.sendStatus(404);
    }
}

module.exports = {
    GetUserHandler,
    PostUserHandler,
    PutUserDetailsHandler,
    DeleteUserHandler
}