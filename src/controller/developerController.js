/** @format */

const { Developer } = require("../mongo");

exports.findAll = (req, res) => {
	Developer.find()
		.then((developers) => {
			res.status(200).json(developers);
		})
		.catch((error) => {
			res.status(500).json(error);
		});
};

exports.findOne = (req, res) => {
	const id = req.params.id;
	Developer.findById(id)
		.populate("user")
		.populate("city")
		.populate("skills")
		.populate("positions")
		.populate("languages")
		.exec()
		.then((developer) => {
			res.status(200).json(developer);
		})
		.catch((error) => {
			res.status(500).json(error);
		});
};

exports.create = (req, res) => {
	const data = req.body;

	const newDeveloper = new Developer(data);
	newDeveloper
		.save()
		.then((developer) => {
			res.status(200).json({ message: "Developer created" });
		})
		.catch((error) => {
			res.status(500).json({ message: "Developer not created" });
		});
};

exports.delete = (req, res) => {
	const id = req.params.id;
	Developer.findByIdAndDelete(id)
		.then((developer) => {
			res.status(200).json({ message: "Developer deleted" });
		})
		.catch((error) => {
			res.status(500).json({ message: "Developer not deleted" });
		});
};

exports.update = (req, res) => {
	const data = req.body;
	const id = req.params.id;
	Developer.findByIdAndUpdate(id, data)
		.then((developer) => {
			res.status(200).json({ message: "Developer updated" });
		})
		.catch((error) => {
			res.status(500).json({ message: "Developer not updated" });
		});
};

exports.search = (req, res) => {
	const query = req.query;
	Developer.findOne(query)
		.then((developer) => {
			res.status(200).json({ message: "Developer Found" });
		})
		.catch((error) => {
			res.status(500).json({ message: "Developer not found" });
		});
};
