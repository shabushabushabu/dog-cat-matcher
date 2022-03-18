const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    birthdate: Date,
    occupation: String,
    hashPassword: String,
    salt: String
  });

const User = mongoose.model("User", userSchema);

module.exports = {
  userSchema,
  User
};