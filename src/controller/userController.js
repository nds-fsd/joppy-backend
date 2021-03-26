const {User} = require('../mongo');


exports.findAll = (req, res) =>{
  User.find().then((users) => {
    res.status(200).json(users);
  }).catch(error => {
    res.status(500).json(error);
  });
}

exports.findOne = (req, res) =>{

  const id = req.params.id;
  User.findById(id).then((user) => {
    res.status(200).json(user);
  }).catch(error => {
    res.status(500).json(error);
  });
}


exports.crate = (req, res) => {
  const data = req.body;
  // hago update contra mongo.
}