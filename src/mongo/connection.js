const mongoose = require("mongoose");
const GridFsStorage = require("multer-gridfs-storage");
const multer = require("multer");
require("dotenv").config();
const databaseHost = process.env.DATABASE_HOST || "localhost";
const databasePort = process.env.DATABASE_PORT || "27017";
const databaseName = process.env.DATABASE_NAME || "app";
const databaseUser = process.env.DATABASE_USER;
const databasePassword = process.env.DATABASE_PASSWORD;
const databaseURL = process.env.DATABASE_URL;
let url;
if (databaseURL) {
  url = databaseURL;
} else {
  if (databaseUser && databasePassword) {
    url = `mongodb://${databaseUser}:${databasePassword}@${databaseHost}:${databasePort}/${databaseName}?authSource=admin`;
  } else {
    url = `mongodb://${databaseHost}:${databasePort}/${databaseName}?authSource=admin`;
  }
}
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => {
  console.log("connected to database");
});

const storage = new GridFsStorage({
  url: url,
  file: (req, file) => {
    const filename = file.originalname;
    return {
      filename: filename,
      bucketName: "uploads",
    };
  },
});
exports.upload = multer({ storage });
