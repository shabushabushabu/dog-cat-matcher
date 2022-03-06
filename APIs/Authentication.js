const sha1= require('sha1');
const crypto = require('crypto');

const UserModel = require("../Models/User");

const LoginHandler = async (req, res) => {
    console.log("POST /login");
    console.log(req.body);

    const userEmail = req.body.email;
    const user = await UserModel.User.findOne({email: userEmail})
    console.log(user)
    if (user) {
        const hashPassword = user.hashPassword;
        const salt = user.salt;

        const attemptPassword = req.body.password
        if (hashPassword == sha1(attemptPassword + salt)) {
            res.send({
                "message": "success",
                "token": sha1(JSON.stringify({
                    user: user.name,
                    email: user.email
                }))
            });
        } else {
            console.log("Incorrect password");
            res.sendStatus(401);
        }
    } else {
        console.log("Email not found");
        res.sendStatus(401) ;
    }
}

module.exports = {
    LoginHandler
}