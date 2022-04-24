const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    birthdate: Date,
    occupation: String,
    hashPassword: String,
    salt: String,
    activateDatetime: Date,
    status: String
  });

const User = mongoose.model("User", userSchema);

module.exports = {
  userSchema,
  User
};