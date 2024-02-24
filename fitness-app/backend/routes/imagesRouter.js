const express = require("express");
const router = express.Router();
const imageController = require("../controllers/imageController");
const { weakAuthentication } = require("../middleware/authenticateToken");

router.post("/", weakAuthentication, imageController.uploadImage);
router.delete("/:deleteHash", weakAuthentication, imageController.deleteImage);

module.exports = router;
