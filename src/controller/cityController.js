const {City} = require('../mongo');

exports.findAll = (req, res) =>{
  City
.find().then((cities) => {
    res.status(200).json(cities);
  }).catch(error => {
    res.status(500).json(error);
  });
}

exports.findOne = (req, res) =>{

  const id = req.params.id;
  City
.findById(id).then((city) => {
    res.status(200).json(city);
  }).catch(error => {
    res.status(500).json(error);
  });
}


exports.create = (req, res) => {
  const data = req.body;

  const newCity = new City
(data);
  newCity.save().then((city) => {
    res.status(200).json({message: "city created"});
  }).catch(error => {
    res.status(500).json({message: "city not created"});
  });
}  

exports.delete = (req, res) => {
  const id = req.params.id;
  City
.findByIdAndDelete(id)
  .then((user) => {
    res.status(200).json({message: "city deleted"});
  }).catch(error => {
    res.status(500).json({message: "city not deleted"});
  });
  }

  exports.update = (req, res) => {
    const data = req.body;
    const id = req.params.id;
    City.findByIdAndUpdate(id, data).then((city) => {
      res.status(200).json({message: "city updated"});
    }).catch(error => {
      res.status(500).json({message: "city not updated"});
    });
    }

    exports.search = (req, res) => {
    const query = req.query;
    City.findOne(query).then((city) => {
      res.status(200).json({message: "city Found"});
    }).catch(error => {
      res.status(500).json({message: "city not found"});
    });
    }