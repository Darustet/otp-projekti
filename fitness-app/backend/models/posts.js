const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        eventName: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
            max: 1000,
        },
        date: {
            type: Date,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        participants: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }],
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
        }],
        likes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }],
        likesCount: {
            type: Number,
            default: 0,
        },
        participantLimit: {
            type: Number,
            min: 0,
        },
        tags: [{
            type: String,
        }],
    },
    { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
