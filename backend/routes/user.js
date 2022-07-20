const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
// const schemaValid = require('../middlewares/validation');
// const validRequest = schemaValid();

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;
