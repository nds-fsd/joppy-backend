/** @format */

const express = require("express");
const configureSockets = require("./socket");
require("dotenv").config();
const app = express();
const cors = require("cors");
app.use(cors());
const bodyParser = require("body-parser");
const server = app.listen(process.env.PORT, () => {
  console.log("server is running on port", server.address().port);
});

exports.io = configureSockets(server);

const appRouter = require("./router");
const { AuthRouter, configSecurity } = require("./security/authController");
const mailer = require("./mailer");
const ImageRouter = require("./cloudinary");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
configSecurity(app);

require("./socket");

app.use("/", appRouter);
app.use("/", AuthRouter);
app.use("/send-email", mailer);
app.use("/image", ImageRouter);
