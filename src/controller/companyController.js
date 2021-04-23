/** @format */

const { Company } = require("../mongo");

exports.findAll = (req, res) => {
	Company.find()
		.then((companies) => {
			res.status(200).json(companies);
		})
		.catch((error) => {
			res.status(500).json(error);
		});
};

exports.findOne = (req, res) => {
	const id = req.params.id;
	Company.findById(id)
		.populate("user")
		.populate("city")
		.populate("skills")
		.populate("positions")
		.populate("languages")
		.exec()
		.then((company) => {
			res.status(200).json(company);
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
		.then((company) => {
			res.status(200).json({ message: "Company created" });
		})
		.catch((error) => {
			res.status(500).json({ message: "Company not created" });
		});
};

exports.delete = (req, res) => {
	const id = req.params.id;
	Company.findByIdAndDelete(id)
		.then((company) => {
			res.status(200).json({ message: "Company deleted" });
		})
		.catch((error) => {
			res.status(500).json({ message: "Company not deleted" });
		});
};

exports.update = (req, res) => {
	const data = req.body;
	const id = req.params.id;
	Company.findByIdAndUpdate(id, data)
		.then((company) => {
			res.status(200).json({ message: "Company updated" });
		})
		.catch((error) => {
			res.status(500).json({ message: "Company not updated" });
		});
};

exports.search = (req, res) => {
	const query = req.query;
	Company.findOne(query)
		.then((company) => {
			res.status(200).json({ message: "Company Found" });
		})
		.catch((error) => {
			res.status(500).json({ message: "Company not found" });
		});
};
