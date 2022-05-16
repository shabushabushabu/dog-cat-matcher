const sha1 = require('sha1');
const crypto = require('crypto');
const moment = require('moment');

const UserModel = require("../Models/User");

const GetUserHandler = async (req, res) => {
    console.log("GET /user/:userId");
    console.log(req.params);

    try {
        const doc = await UserModel.User.findById(req.params.userId);
        if (doc) {
            res.send(JSON.stringify({
                id: doc._id,
                firstName: doc.firstName,
                lastName: doc.lastName,
                email: doc.email,
                birthdate: doc.birthdate,
                occupation: doc.occupation
            }));
        } else {
            res.sendStatus(404);
        }

    } catch (err) {
        console.error(err);
        res.sendStatus(400);
    }
}

const PostUserHandler = async (req, res) => {
    console.log("POST /user");
    console.log(req.body);

    try {
        const docs = await UserModel.User.find({ email: req.body.email });
        console.log(docs);
        if (docs.length > 0) {
            res.sendStatus(403);
            return
        } else {
            const salt = crypto.randomBytes(128).toString('base64');
            const newUser = UserModel.User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                birthdate: moment(req.body.birthdate).utcOffset(0)
                    .set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).format(),
                occupation: req.body.occupation,
                hashPassword: sha1(req.body.password + salt),
                salt: salt,
                activateDatetime: Date.now(),
                status: "active"
            });
            const result = await newUser.save();
            res.send(JSON.stringify({
                "result": "success",
                "userId": result._id.toString()
            }));
        }

    } catch (err) {
        console.error(err);
        res.sendStatus(400);
    }
}

const PutUserDetailsHandler = async (req, res) => {
    console.log("PUT /user");
    console.log(req.body);

    try {
        const doc = await UserModel.User.findById(req.body.id);
        if (doc) {
            const updateUser = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                birthdate: moment(req.body.birthdate).utcOffset(0)
                    .set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).format(),
                occupation: req.body.occupation,
                status: req.body.status
            };
            const result = await UserModel.User.updateOne({ _id: req.body.id }, updateUser);
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }

    } catch (err) {
        console.error(err);
        res.sendStatus(400);
    }
}

const DeleteUserHandler = async (req, res) => {
    console.log("DELETE /user");
    console.log(req.body);

    try {
        const doc = await UserModel.User.findById(req.body.id);
        if (doc) {
            const hashPassword = doc.hashPassword;
            const salt = doc.salt;

            const attemptPassword = req.body.password
            if (hashPassword == sha1(attemptPassword + salt)) {
                const result = await UserModel.User.deleteOne({ _id: req.body.id })
                res.sendStatus(200);
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
    GetUserHandler,
    PostUserHandler,
    PutUserDetailsHandler,
    DeleteUserHandler
}