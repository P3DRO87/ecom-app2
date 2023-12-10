const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const dbConnection = require("./db/config");
const cors = require("cors");
const Product = require("./models/Product");
// const { nextApp, handle } = require("../client/server");
require("dotenv").config();

const os = require("os");

const {
   Ethernet: [{ address }],
} = os.networkInterfaces();

const { PORT = 3004, HOST = "localhost", NE_HOST = address } = process.env;

const hosts = [HOST, NE_HOST];

app.use(cors());
app.use(cookieParser());

app.use(express.json());

dbConnection();

app.get("/api/test", async (req, res) => {
   res.json({ products: "hola" });
});

app.use("/api/products", require("./routes/products"));

app.use("/api/user", require("./routes/user"));

app.use("/api/orders", require("./routes/orders"));

app.use("/api/admin", require("./routes/admin"));

// nextApp.prepare().then(() => {
//    app.get("*", (req, res) => {
//       return handle(req, res);
//    });
// });

hosts.forEach((host) => {
   app.listen(PORT, host, () => console.log(`server running at http://${host}:${PORT}`));
});

module.exports = app;
