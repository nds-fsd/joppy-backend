/** @format */

const { User } = require("../mongo");
const mongoose = require("mongoose");
exports.findAll = (req, res) => {
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .populate("location")
    .populate("skills.name", "skill")
    .populate("tech")
    .populate("positions.name", "name")
    .populate("languages")
    .exec()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

exports.create = (req, res) => {
  const data = req.body;

  const newUser = new User(data);
  newUser
    .save()
    .then((data) => {
      res.status(200).json({ message: "user created" });
    })
    .catch((error) => {
      res.status(500).json({ message: "user not created" });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  User.findByIdAndDelete(id).then((user) => {
    res.status(200).json({ message: "user deleted" });
  });
  const gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "uploads",
  });
  Promise.all(
    user.images.map((img) => {
      return new Promise((resolve, reject) => {
        const id = mongoose.Types.ObjectId(img);
        gfs.delete(id, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
      });
    })
  ).then(() => {
    return res.status(200).send();
  });
};

exports.update = (req, res) => {
  const data = req.body;
  const id = req.params.id;
  User.findByIdAndUpdate(id, data)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
};

exports.search = (req, res) => {
  const query = req.query;
  User.findOne(query)
    .then((user) => {
      res.status(200).json({ message: "User Found" });
    })
    .catch((error) => {
      res.status(500).json({ message: "User not found" });
    });
};
