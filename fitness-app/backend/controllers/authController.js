const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../models/users");

// Generate access token
const login = async (req, res) => {
	const { userTag, password } = req.body;
	try {
		const user = await User.findOne({ userTag }).populate("sensitiveData");
		if (!user) return res.status(400).json({ message: `User ${userTag} not found.` });
		console.log(user.sensitiveData);

		const correctPassword = await bcrypt.compare(password, user.sensitiveData.password);
		if (!correctPassword) return res.status(400).json({ message: "Invalid credentials.", isMatch: false });

		const tokenUser = { userId: user._id };

		const accessToken = jwt.sign(tokenUser, process.env.ACCESS_TOKEN_SECRET);

		res.status(200).json({ accessToken, user: tokenUser });
	} catch (err) {
		console.error(err);
		res.status(400).json({ message: err.message });
	}
};

// Logout and remove refresh token from database
const logout = async (req, res) => {
	// Clear the refresh token cookie
	res.clearCookie("__refreshToken__");

	// Send a success response
	res.sendStatus(200);
};

module.exports = { login, logout };
