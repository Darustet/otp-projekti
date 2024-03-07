const config = require("../config");
const mongoose = require("mongoose");


const connectDB = async () => {
	
	console.log("Mongo_URI: ", config.MONGO_URI);	 
	const conn = await mongoose.connect(config.MONGO_URI);
	console.log("MongoDB connected");
};

module.exports = connectDB;
