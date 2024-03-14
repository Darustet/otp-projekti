const express = require("express");
const usersController = require("../controllers/usersController");
const { strongAuthentication, weakAuthentication } = require("../middleware/authentaicateToken.js");
const authenticateToken = require("../middleware/auth");
const router = express.Router();
const profileController = require("../controllers/profileController.js")

router.get("/", usersController.getUsers);
router.post("/", usersController.createUser);
router.delete("/", authenticateToken, usersController.deleteUserByAuth);
router.get("/me", authenticateToken, profileController.getAuthUserInfo)

router.get("/:id", usersController.getUserById);
router.get("/userTag/:userTag", usersController.getUserByUserTag);
router.put("/", authenticateToken, usersController.updateUserByAuth);

// moukkka tapahtuman luonti
//router.put("/events", authenticateToken, postController.createEvent);



module.exports = router;
