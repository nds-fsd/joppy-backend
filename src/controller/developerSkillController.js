/** @format */

const { DeveloperSkill } = require("../mongo");

exports.findAll = (req, res) => {
	DeveloperSkill.find()
		.then((developerSkills) => {
			res.status(200).json(developerSkills);
		})
		.catch((error) => {
			res.status(500).json(error);
		});
};

exports.findOne = (req, res) => {
	const id = req.params.id;
	DeveloperSkill.findById(id)
		.then((developerSkill) => {
			res.status(200).json(developerSkill);
		})
		.catch((error) => {
			res.status(500).json(error);
		});
};

exports.create = (req, res) => {
	const data = req.body;

	const newDeveloperSkill = new DeveloperSkill(data);
	newDeveloperSkill
		.save()
		.then((developerSkill) => {
			res.status(200).json({ message: "DeveloperSkill created" });
		})
		.catch((error) => {
			res.status(500).json({ message: "DeveloperSkill not created" });
		});
};

exports.delete = (req, res) => {
	const id = req.params.id;
	DeveloperSkill.findByIdAndDelete(id)
		.then((developerSkill) => {
			res.status(200).json({ message: "DeveloperSkill deleted" });
		})
		.catch((error) => {
			res.status(500).json({ message: "DeveloperSkill not deleted" });
		});
};

exports.update = (req, res) => {
	const data = req.body;
	const id = req.params.id;
	DeveloperSkill.findByIdAndUpdate(id, data)
		.then((developerSkill) => {
			res.status(200).json({ message: "DeveloperSkill updated" });
		})
		.catch((error) => {
			res.status(500).json({ message: "DeveloperSkill not updated" });
		});
};

exports.search = (req, res) => {
	const query = req.query;
	DeveloperSkill.findOne(query)
		.then((developerSkill) => {
			res.status(200).json({ message: "DeveloperSkill Found" });
		})
		.catch((error) => {
			res.status(500).json({ message: "DeveloperSkill not found" });
		});
};
