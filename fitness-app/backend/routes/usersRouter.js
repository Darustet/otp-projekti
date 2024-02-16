const express = require("express");
const usersController = require("../controllers/usersController");
const { strongAuthentication } = require("../middleware/auth");
const router = express.Router();

router.get("/", usersController.getUsers);
router.post("/", usersController.createUser);

router.get("/:id", usersController.getUserById);
router.get("/userTag/:userTag", usersController.getUserByUserTag);

module.exports = router;
