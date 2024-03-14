const mongoose = require("mongoose");
const Post = require("../models/posts");

const PostController = {
  createPost: async (req, res) => {
    const { title, description, start, end, start_time, end_time, location, categories, images, tags } = req.body;
    const host = req.account; 
    const newPost = new Post({
      title,
      description,
      start,
      end,
      location,
      categories,
      tags,
      host: req.account,
      images: images || [],
    });

    try {
      const savedPost = await newPost.save();
      res.status(201).json(savedPost);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  
  updatePost: async (req, res) => {
    const { id } = req.params;
    const { title, description, start, end,location, categories, participants, images, tags } = req.body;
const host = req.account;
    try {
      const updatedPost = await Post.findByIdAndUpdate(id, {
        title,
        description,
        start,
        end,
        location,
        categories,
        host,
        participants,
        images,
        tags
      },);

      res.status(200).json(updatedPost);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error.message });
    }
  },

  // Muut metodit pysyvät ennallaan
  getAllPosts: async (req, res) => {
    try {
      // Using .populate('host') to include the user information referenced by the 'host' field in each post
      // You might want to limit the fields of the user that you want to include in the response
      const posts = await Post.find().populate({
        path: 'host',
        select: 'userTag profilePicture username -_id' // This line selects which fields to include (excluding the _id field)
      });
      res.status(200).json(posts);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  // get posts by host
  getPostsByHost: async (req, res) => {

    const  hostId  = req.account;
    try {
      const posts = await Post.find({ host: hostId }).populate({
        path: 'host',
        select: 'userTag profilePicture username -_id' // This line selects which fields to include (excluding the _id field)
      });

      res.status(200).json(posts);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

 // remove req.account from participants
  leavePost: async (req, res) => {
    const { id } = req.params;
    const { userId } = req.account;
    try {
      const post = await Post.findById(id);
      if (post) {
        if (post.participants.includes(userId)) {
          post.participants = post.participants.filter((participant) => participant  !== userId);
          await post.save();
          res.status(200).json(post);
        } else {
          res.status(400).json({ message: 'User not joined the post' });
        }
      } else {
        res.status(404).json({ message: 'Post not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  //getall post where req.account is in participants

  getPostsByParticipant: async (req, res) => {
    const { userId } = req.account;
    try {
      const posts = await Post.find({ participants: userId }).populate({
        path: 'host',
        select: 'userTag profilePicture username -_id' // This line selects which fields to include (excluding the _id field)
      });
      res.status(200).json(posts);
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: error.message });
    }
  },


  //liity postaukseen 
  joinPost: async (req, res) => {
    const { id } = req.params;
    const { userId } = req.account;
    try {
      const post = await Post.findById(id);
      if (post) {
        if (!post.participants.includes(userId)) {
          post.participants.push(userId);
          await post.save();
          res.status(200).json(post);
        } else {
          res.status(400).json({ message: 'User already joined the post' });
        }
      } else {
        res.status(404).json({ message: 'Post not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  
  

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
