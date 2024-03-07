const express = require("express");
const usersController = require("../controllers/usersController");
const { strongAuthentication, weakAuthentication } = require("../middleware/authentaicateToken.js");
const authenticateToken = require("../middleware/auth");
const router = express.Router();

router.get("/", usersController.getUsers);
router.post("/", usersController.createUser);
router.delete("/", authenticateToken, usersController.deleteUserByAuth);

router.get("/:id", usersController.getUserById);
router.get("/userTag/:userTag", usersController.getUserByUserTag);

// kuvien luominen

// tapahtumien luominen

//tapahtumien muokkaaminen

//tapahtumien poistaminen

module.exports = router;
