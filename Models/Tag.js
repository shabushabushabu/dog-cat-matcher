const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    word: String,
    animalIds: [String]
  });

const Tag = mongoose.model("Tag", tagSchema);

module.exports = {
  tagSchema,
  Tag
};