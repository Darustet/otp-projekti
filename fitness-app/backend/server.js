const server = require("./app");
const config = require("./config");
//const eventsRoute = require("./routes/eventsRoute");

//app.use("/events", eventsRoute);

server.listen(config.PORT, () => console.log(`Server running on port ${config.PORT}`));
