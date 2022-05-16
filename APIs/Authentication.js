const sha1= require('sha1');
const crypto = require('crypto');

const UserModel = require("../Models/User");

const LoginHandler = async (req, res) => {
    console.log("POST /login");
    console.log(req.body);
    try {
        const user = await UserModel.User.findOne({email: req.body.email});
        console.log(user);
        if (user) {
            const hashPassword = user.hashPassword;
            const salt = user.salt;

            const attemptPassword = req.body.password;
            if (hashPassword == sha1(attemptPassword + salt)) {
                res.send({
                    "message": "success",
                    "token": sha1(JSON.stringify({
                        user: user.name,
                        email: user.email
                    }))
                });
            } else {
                res.sendStatus(401);
            }
        } else {
            res.sendStatus(404);
        }

    } catch (err) {
        console.error(err);
        res.sendStatus(400);
    }
}

module.exports = {
    LoginHandler
}