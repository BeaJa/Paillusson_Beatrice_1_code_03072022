// --- Importation
const mongoose = require("mongoose");
const mongodbErrorHandler = require('mongoose-mongodb-errors');

// --- Structure des sauces
const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String },
  manufacturer: { type: String },
  description: { type: String },
  mainPepper: { type: String },
  imageUrl: { type: String },
  heat: { type: Number },
  likes: { type: Number },
  dislikes: { type: Number },
  usersLiked: [{ type: String }],
  usersDisliked: [{ type: String }],
});

sauceSchema.plugin(mongodbErrorHandler);
module.exports = mongoose.model("sauces", sauceSchema);
