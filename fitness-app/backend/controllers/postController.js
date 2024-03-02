const mongoose = require("mongoose");
const Post = require("../models/posts");
const { User } = require("../models/users");



const PostController = {
  // Create a new post
  createPost: async (req, res) => {
    const { title, description, date, location, categories, tags } = req.body;
    
    const newPost = new Post({
      title,
      description,
      date,
      location,
      categories,
      tags,
      host: req.account,
    });

    console.log(req.account);
   

    try {
      const savedPost = await newPost.save();
      res.status(201).json(savedPost);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Get all posts
  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.find();
      res.status(200).json(posts);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  // Get a single post by ID
  getPostById: async (req, res) => {
    const { id } = req.params;
    try {
      const post = await Post.findById(id);
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: 'Post not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update a post
  updatePost: async (req, res) => {
    const { id } = req.params;
    const { title, description, date, location, categories, host, participants, tags } = req.body;

    try {
      const updatedPost = await Post.findByIdAndUpdate(id, {
        title,
        description,
        date,
        location,
        categories,
        host,
        participants,
        tags
      }, { new: true }); // Return the updated object

      res.status(200).json(updatedPost);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete a post
  deletePost: async (req, res) => {
    const { id } = req.params;
    try {
      await Post.findByIdAndDelete(id);
      res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = PostController;
