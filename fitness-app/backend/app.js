const express = require("express");
const cors = require("./middleware/cors");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const app = express();
const http = require("http").createServer(app);
const errorHandler = require("./middleware/errorMiddleware");
const socketIO = require("socket.io")(http, { cors: { origin: "http://localhost:3000" } });
//const swaggerUI = require("swagger-ui-express");
//const swaggerSpec = require("./swagger.json");

connectDB();

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(cors);

socketIO.on("connection", require("./routes/socketRouter"));

app.use("/api/auth", require("./routes/authRouter"));
app.use("/api/users", require("./routes/usersRouter"));
//app.use("/api/posts", require("./routes/postsRouter"));
app.use("/api/profile", require("./routes/profileRouter"));
app.use("/api/image", require("./routes/imageRouter"));

// swagger docs route toistaseki ei toiminnassa

//app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.get("/", (req, res) => res.json({ message: "Welcome to the application." }));

app.get("/error", (req, res) => {
	throw new Error("Error!");
});

app.use(errorHandler.errorHandler);
app.use(errorHandler.unknownEndpoint);

module.exports = http;
