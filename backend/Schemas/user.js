// --- Importation
const mongoose = require("mongoose");
const mongodbErrorHandler = require("mongoose-mongodb-errors");
const uniqueValidator = require("mongoose-unique-validator");

// --- Variable structure email et password
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// --- plugin de vérification de la base de données 
userSchema.plugin(mongodbErrorHandler);
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
