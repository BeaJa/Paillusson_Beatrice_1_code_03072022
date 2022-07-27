// --- Importation
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Schemas/user");

// --- Fonction regex pour validation email
function ValidateEmail(email) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
  {
    return (true)
  }
    return (false)
}

// --- Fonction regex pour validation password
function validatePassword(password) {
  if (/^[A-Za-z0-9]\w{8,}$/.test(password)) {
    return (true)
  }
    return (false)
}

// --- Inscription
exports.signup = (req, res) => {
    if (!ValidateEmail(req.body.email)) {
    return res.status(400).json({message: 'email incorrect'});
  } 
  if (!validatePassword(req.body.password)) {
    return res.status(400).json({message: "password incorrect"})
  }
  bcrypt
    .hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash,
      })
      user
        .save()
        .then(() => res.status(201).json({ message: "utilisateur crée !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// --- connexion
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ message: "Identifiant incorrect !" });
      } else {
        bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ message: "Identifiant incorrect !" });
          } else {
            res.status(200).json({
              userId: user._id,
              token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
                expiresIn: "24h"})
          });
        };
    })
  }
})
    .catch((error) => res.status(500).json({ error }));
}
