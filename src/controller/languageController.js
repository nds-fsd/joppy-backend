/** @format */

const { Language } = require("../mongo");

exports.findAll = (req, res) => {
	Language.find({})
		.then((languages) => {
			res.status(200).json(languages);
		})
		.catch((error) => {
			res.status(500).json(error);
		});
};

exports.findOne = (req, res) => {
	const id = req.params.id;
	Language.findById(id)
		.then((language) => {
			res.status(200).json(language);
		})
		.catch((error) => {
			res.status(500).json(error);
		});
};

exports.create = (req, res) => {
	const data = req.body;

	const newLanguage = new Language(data);
	newLanguage
		.save()
		.then((language) => {
			res.status(200).json({ message: "Language created" });
		})
		.catch((error) => {
			res.status(500).json({ message: "Language not created" });
		});
};

exports.delete = (req, res) => {
	const id = req.params.id;
	Language.findByIdAndDelete(id)
		.then((language) => {
			res.status(200).json({ message: "Language deleted" });
		})
		.catch((error) => {
			res.status(500).json({ message: "Language not deleted" });
		});
};

exports.update = (req, res) => {
	const data = req.body;
	const id = req.params.id;
	Language.findByIdAndUpdate(id, data)
		.then((language) => {
			res.status(200).json({ message: "Language updated" });
		})
		.catch((error) => {
			res.status(500).json({ message: "Language not updated" });
		});
};

exports.search = (req, res) => {
	const query = req.query;
	Language.findOne(query)
		.then((language) => {
			res.status(200).json({ message: "Language Found" });
		})
		.catch((error) => {
			res.status(500).json({ message: "Language not found" });
		});
};
