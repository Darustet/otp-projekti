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
		start_time:{
			type: String,
			required: true,
		},
		
		 end_time:{
			type: String,
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
		// Any additional fields you need for the sports day event
		// ...
	},
	{ timestamps: true }
);
const Post = mongoose.model("Post", postSchema);

module.exports =  Post;
