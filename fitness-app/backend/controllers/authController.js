const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User, SensitiveData} = require("../models/users");

// Generate access token
const login = async (req, res) => {
    const { userTag, password } = req.body;
    try {
        const user = await User.findOne({ userTag }).populate("Data");
        if (!user) return res.status(404).json({ message: `User ${userTag} not found.` });

        const correctPassword = await bcrypt.compare(password, user.Data.password);
        if (!correctPassword) return res.status(400).json({ message: "Invalid credentials.", isMatch: false });

        const tokenUser = { userId: user._id };

        const accessToken = jwt.sign(tokenUser, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });

        res.status(200).json({ accessToken, user: tokenUser });
    } catch (err) {
        res.status(404).json({ message: err.message });
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

