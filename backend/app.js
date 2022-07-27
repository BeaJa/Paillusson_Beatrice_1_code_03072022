// --- Importation
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const path = require("path");
const dotenv = require("dotenv");

// --- Routes requises
const saucesRoutes = require("./routes/sauces");
const userRoutes = require("./routes/user");

// --- Appel du module
const app = express();

// --- Appel de l'environnement
dotenv.config();

app.use(
  helmet({
crossOriginResourcePolicy : { policy: "same-site"}
  }));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
  
// --- Connexion MongoDB
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_Username}:${process.env.DB_Password}@atlascluster.dfhjt.mongodb.net/?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// app.use(bodyParser.json());

//header d'accès global à l'API
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// Requete du chemin vers le fichier de stockage images
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/auth", userRoutes);

app.use("/api/sauces", saucesRoutes);

module.exports = app;
