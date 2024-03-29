const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: String,
		start: {
			type: Date,
			required: true,
		},
		end: {
			type: Date,
			required: true,
		},

		location: {
			type: String,
			required: true,
		},
		categories: [
			{
				type: String,
				required: true,
			},
		],
		host: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		participants: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		participantCount: {
			type: Number,
			default: 0,
		},
		images: {
			type: Array,
			default: [],
		},
		tags: {
			type: Array,
			default: [],
		},
	},
	{ timestamps: true }
);
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
