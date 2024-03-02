const env = require("dotenv").config();
const jwt = require("jsonwebtoken");
module.exports = async (req, res, next) => {
  try {
    const authHeader = req.get("authorization");
    const token = authHeader;
    verifiedPayload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(verifiedPayload);
    req.account = verifiedPayload.userId;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: "Invalid token" });
  }
};

