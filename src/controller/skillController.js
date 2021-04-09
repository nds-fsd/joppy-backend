const { Skill } = require("../mongo");

exports.findAll = (req, res) => {
  Skill.find()
    .then((Skills) => {
      res.status(200).json(Skills);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Skill.findById(id)
    .then((Skill) => {
      res.status(200).json(Skill);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

exports.create = (req, res) => {
  const data = req.body;

  const newSkill = new Skill(data);
  newSkill
    .save()
    .then((Skill) => {
      res.status(200).json({ message: "Skill created" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Skill not created" });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Skill.findByIdAndDelete(id)
    .then((user) => {
      res.status(200).json({ message: "Skill deleted" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Skill not deleted" });
    });
};

exports.update = (req, res) => {
  const data = req.body;
  const id = req.params.id;
  Skill.findByIdAndUpdate(id, data)
    .then((Skill) => {
      res.status(200).json({ message: "Skill updated" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Skill not updated" });
    });
};

exports.search = (req, res) => {
  const query = req.query;
  Skill.findOne(query)
    .then((Skill) => {
      res.status(200).json({ message: "Skill Found" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Skill not found" });
    });
};
