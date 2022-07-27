// importation
const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer");

const ctrlSauces = require("../controllers/sauces");

// Routes
router.get("/", auth, ctrlSauces.getAllSauces);
router.get("/:id", auth, ctrlSauces.getOneSauce);
router.post("/", auth, multer, ctrlSauces.createSauce);
router.put("/:id", auth, multer, ctrlSauces.modifySauce);
router.delete("/:id", auth, ctrlSauces.deleteSauce);
router.post("/:id/like", auth, ctrlSauces.likeSauce);

module.exports = router;
