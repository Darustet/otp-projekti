const express = require("express");
const cors = require("./middleware/cors");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const app = express();
const http = require("http").createServer(app);
const errorHandler = require("./middleware/errorMiddleware");

connectDB();

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(cors);

app.use("/api/auth", require("./routes/authRouter"));

app.use("/api/users", require("./routes/usersRouter"));

app.get("/", (req, res) => res.json({ message: "Welcome to the application." }));

app.get("/error", (req, res) => {
	throw new Error("Error!");
});

app.use(errorHandler.errorHandler);
app.use(errorHandler.unknownEndpoint);

module.exports = http;
