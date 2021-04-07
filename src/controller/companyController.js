const { Company } = require("../mongo");

exports.findAll = (req, res) => {
  Company.find({})
    .then((cities) => {
      res.status(200).json(cities);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Company.findById(id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

exports.create = (req, res) => {
  const data = req.body;

  const newCompany = new Company(data);
  newCompany
    .save()
    .then((data) => {
      res.status(200).json({ message: "company  created" });
    })
    .catch((error) => {
      res.status(500).json({ message: "company  not created" });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Company.findByIdAndDelete(id)
    .then((user) => {
      res.status(200).json({ message: "company  deleted" });
    })
    .catch((error) => {
      res.status(500).json({ message: "company  not deleted" });
    });
};

exports.update = (req, res) => {
  const data = req.body;
  const id = req.params.id;
  Company.findByIdAndUpdate(id, data)
    .then((data) => {
      res.status(200).json({ message: "company  updated" });
    })
    .catch((error) => {
      res.status(500).json({ message: "company  not updated" });
    });
};

exports.search = (req, res) => {
  const query = req.query;
  Company.findOne(query)
    .then((data) => {
      res.status(200).json({ message: "company  Found" });
    })
    .catch((error) => {
      res.status(500).json({ message: "company  not found" });
    });
};
