const express = require("express");
const postController = require("../controllers/postController");
const router = express.Router();
const { optionalAuthentication, weakAuthentication } = require("../middleware/auth");

router.get("/", optionalAuthentication, postController.getPosts);
router.get("/home", weakAuthentication, postController.getFeedPosts);
router.get("/:id", postController.getPostById);

router.get("/author/:userTag", postController.getPostsByAuthor);
router.post("/", weakAuthentication, postController.createPost);
router.patch("/:id", weakAuthentication, postController.updatePost);
router.delete("/:id", weakAuthentication, postController.deletePost);

module.exports = router;
