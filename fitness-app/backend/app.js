const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
//const cookieParser = require("cookie-parser");
const app = express();

const errorHandler = require("./middleware/errorMiddleware");

//const swaggerUI = require("swagger-ui-express");
//const swaggerSpec = require("./swagger.json");

connectDB();

app.use(express.json({ limit: "50mb" }));
app.use(cors());

app.use("/api/auth", require("./routes/authRouter"));
app.use("/api/users", require("./routes/usersRouter"));
app.use("/api/posts", require("./routes/PostsRouter"));

// swagger docs route toistaseki ei toiminnassa

//app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.get("/", (req, res) => res.json({ message: "Welcome to the application." }));

app.get("/error", (req, res) => {
	throw new Error("Error!");
});

app.use(errorHandler.errorHandler);
app.use(errorHandler.unknownEndpoint);
const http = require("http").createServer(app);
module.exports = http;
