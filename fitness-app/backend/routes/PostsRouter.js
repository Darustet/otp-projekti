const express = require("express");
const PostController = require("../controllers/postController"); // Ensure this path is correct
const router = express.Router();
const authenticateToken = require("../middleware/auth");

//Get all posts
router.get("/", PostController.getAllPosts);

//Get posts for the homepage feed - assuming it's similar to getting all posts

//Get a single post by ID
router.get("/:id", PostController.getPostById);

//Get posts by a specific author - assuming you have this logic in your controller
//If not, you'll need to implement it in PostController
//router.get("/author/:userTag", PostController.getPostsByAuthor);

//Create a new post
router.post("/",authenticateToken, PostController.createPost);

//Update a post
router.patch("/:id", PostController.updatePost);

//Delete a post
router.delete("/:id", PostController.deletePost);

module.exports = router;
