// --- importation
const jwt = require("jsonwebtoken");

// --- module d'authentification
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;
    // console.log("id from auth");
    // console.log(userId);
    req.auth = { userId };
    if (req.body.userId && req.body.userId !== userId) {
      throw " 403: unauthorized request.";
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};

