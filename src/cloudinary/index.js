const express = require("express");
require("dotenv").config();
const app = express();
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ limit: "50mb", extended: true }));

const ImageRouter = new express.Router();

ImageRouter.post("/upload", async (req, res) => {
  const data = req.body.data;
  const id = req.params.id;
  try {
    const uploadedResponse = await cloudinary.uploader.upload(data, { upload_preset: "wchygywm" });
    res.status(200).json(uploadedResponse);
    console.log(uploadedResponse.url);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

ImageRouter.get("/library", async (req, res) => {
  const { resources } = await cloudinary.search.expression("folder:wchygywm");
  const publicIds = resources.map((file) => file.publicId);
  res.send(publicIds);
});

module.exports = ImageRouter;
