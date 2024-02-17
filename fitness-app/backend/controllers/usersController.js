const mongoose = require("mongoose");
const { User, UserData } = require("../models/users");
const bcrypt = require("bcryptjs");

// get all users
const getUsers = async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// get user by id
const getUserById = async (req, res) => {
	const { id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).send(`No user with id: ${id}`);
	}
	const user = await User.findById(id);

	if (!user) return res.status(404).json({ message: `User with id ${id} not found.` });
	res.status(200).json(user);
};

// get user by userTag
const getUserByUserTag = async (req, res) => {
	const { userTag } = req.params;
	try {
		const user = await User.findOne({ userTag: userTag });
		if (!user) return res.status(404).json({ message: `User ${userTag} not found.` });
		res.json(user);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

// create user
const createUser = async (req, res) => {
	const { userTag, email, password } = req.body;

	if (!email || !password) return res.status(400).json({ message: "Username, email, and password are required." });

	try {
		const existingName = await User.findOne({ userTag });
		if (existingName) return res.status(409).json({ message: "Username already exists." });

		const existingEmail = await Data.findOne({ email });
		if (existingEmail) return res.status(409).json({ message: "Email already exists." });

		const encryptedPassword = await bcrypt.hash(password, 10);
		const Data = new Data({ email, password: encryptedPassword });
		const user = new User({ userTag, username: userTag, Data });

		await user.save();
		await Data.save();
		res.status(201).json(user);
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
};

module.exports = {
	getUsers,
	getUserById,
	createUser,
	getUserByUserTag,
};