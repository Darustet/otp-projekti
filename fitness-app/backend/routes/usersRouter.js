const express = require("express");
const usersController = require("../controllers/usersController");
const { strongAuthentication, weakAuthentication } = require("../middleware/auth");

const router = express.Router();

router.get("/", usersController.getUsers);
router.post("/", usersController.createUser);
router.delete("/", strongAuthentication, usersController.deleteUserByAuth);

router.get("/:id", usersController.getUserById);
router.get("/userTag/:userTag", usersController.getUserByUserTag);

// kuvien luominen

// tapahtumien luominen

//tapahtumien muokkaaminen

// router.delete("/:id", strongAuthentication, usersController.deleteUser);

module.exports = router;
