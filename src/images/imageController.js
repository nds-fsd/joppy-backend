require("dotenv").config();
const express = require("express");
const { upload } = require("../mongo");
const mongoose = require("mongoose");

const ImageRouter = express.Router();

ImageRouter.post("/image", upload.any(), (req, res) => {
  res.status(200).json(req.files);
});

ImageRouter.get("/image/:id", (req, res) => {
  const gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "uploads",
  });
  let id;
  try {
    id = mongoose.Types.ObjectId(req.params.id);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
  gfs
    .find({
      _id: id,
    })
    .toArray((err, files) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (!files || files.length === 0) {
        return res.status(404).json({
          error: "file does not exist",
        });
      }
      gfs.openDownloadStream(id).pipe(res);
    });
});

module.exports = { ImageRouter };
