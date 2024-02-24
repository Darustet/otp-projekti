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

		sensitiveData: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "SensitiveData",
		},
		profilePicture: {
			type: String,
			default: "",
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

const sensitiveDataSchema = new mongoose.Schema({
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

const SensitiveData = mongoose.model("SensitiveData", sensitiveDataSchema);

const User = mongoose.model("User", userSchema);

module.exports = { User, SensitiveData };
