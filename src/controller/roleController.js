const {Role} = require('../mongo');

exports.findAll = (req, res) =>{
  Role
.find().then((roles) => {
    res.status(200).json(roles);
  }).catch(error => {
    res.status(500).json(error);
  });
}

exports.findOne = (req, res) =>{

  const id = req.params.id;
  Role
.findById(id).then((role) => {
    res.status(200).json(role);
  }).catch(error => {
    res.status(500).json(error);
  });
}


exports.create = (req, res) => {
  const data = req.body;

  const newRole = new Role
(data);
  newRole.save().then((role) => {
    res.status(200).json({message: "role created"});
  }).catch(error => {
    res.status(500).json({message: "role not created"});
  });
}  

exports.delete = (req, res) => {
  const id = req.params.id;
  Role
.findByIdAndDelete(id)
  .then((user) => {
    res.status(200).json({message: "role deleted"});
  }).catch(error => {
    res.status(500).json({message: "role not deleted"});
  });
  }

  exports.update = (req, res) => {
    const data = req.body;
    const id = req.params.id;
    Role.findByIdAndUpdate(id, data).then((role) => {
      res.status(200).json({message: "role updated"});
    }).catch(error => {
      res.status(500).json({message: "role not updated"});
    });
    }

    exports.search = (req, res) => {
    const query = req.query;
    Role.findOne(query).then((role) => {
      res.status(200).json({message: "Role Found"});
    }).catch(error => {
      res.status(500).json({message: "Role not found"});
    });
    }
    