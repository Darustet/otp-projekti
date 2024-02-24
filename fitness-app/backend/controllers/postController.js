const mongoose = require("mongoose");
const Post = require("../models/posts");
const { User } = require("../models/users");



// create post
const createPost = async (req, res) => {
	const { userId } = req.user;
	const { postText, tags, images } = req.body;
	if (!userId) return res.status(400).json({ message: "UserTag is required." });
	if (!postText) return res.status(400).json({ message: "Post text is required." });

	if (tags && !Array.isArray(tags)) return res.status(400).json({ message: "Tags must be an array." });
	if (images && !Array.isArray(images)) return res.status(400).json({ message: "Images must be an array." });

	try {
		const user = await User.findById(userId);
		if (!user) return res.status(400).json({ message: "User does not exist." });
		try {
			const newPost = new Post({ postText, user, tags, images });
			newPost.populate("user");
			await newPost.save();
			res.status(201).json(newPost);
		} catch (error) {
			res.status(409).json({ message: error.message });
		}
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const updatePost = async (req, res) => {
	const { userId } = req.user;
	const { id } = req.params;
	const { postText, tags, images } = req.body;
	if (!postText) return res.status(400).json({ message: "Post text is required." });
	if (tags && !Array.isArray(tags)) return res.status(400).json({ message: "Tags must be an array." });
	if (images && !Array.isArray(images)) return res.status(400).json({ message: "Images must be an array." });

	try {
		const updatedPost = await Post.findOneAndUpdate({ _id: id, user: userId }, { postText, edited: true, tags, images }, { new: true });
		if (!updatedPost) return res.status(400).json({ message: "Post does not exist." });
		res.status(200).json(updatedPost);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const deletePost = async (req, res) => {
	const { userId } = req.user;
	const { id } = req.params;

	try {
		const baseRemoved = { user: null, postText: "Post removed", removed: true, tags: [], images: [] };
		const post = await Post.findOneAndUpdate({ _id: id, user: userId }, baseRemoved).populate("replyParentId");
		if (!post) return res.status(400).json({ message: "Post does not exist." });
		const parent = post.replyParentId;
		if (!post.comments?.length) {
			await Post.findByIdAndDelete(id);

			if (parent) {
				parent.comments.pull(id);
				parent.save();
				socketIO.emit("post/" + parent._id, { comments: parent.comments.length });
			}
			return res.json({ message: "Post deleted successfully." });
		}

		Object.assign(post, baseRemoved);
		res.json(post);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};


module.exports = { createPost, updatePost, deletePost };