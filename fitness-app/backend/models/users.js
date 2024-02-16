const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		userTag: {
			type: String,
			required: true,
			unique: true,
			min: 3,
			max: 20,
		},
		Data: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Data",
		},
		username: {
			type: String,
			required: true,
			unique: true,
			min: 3,
			max: 20,
		},

		sportsEvents: [
			{
				eventName: String,
				date: Date,
				location: String,
				description: String,
			},
		],
	},
	{ timestamps: true }
);

const DataSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		max: 50,
	},
	password: {
		type: String,
		required: true,
		min: 6,
	},
});

const Data = mongoose.model("Data", DataSchema);

const User = mongoose.model("User", userSchema);

module.exports = { User, Data };
