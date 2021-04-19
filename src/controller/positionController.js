/** @format */

const { Position } = require("../mongo");

exports.findAll = (req, res) => {
	Position.find()
		.then((positions) => {
			res.status(200).json(Positions);
		})
		.catch((error) => {
			res.status(500).json(error);
		});
};

exports.findOne = (req, res) => {
	const id = req.params.id;
	Position.findById(id)
		.then((position) => {
			res.status(200).json(position);
		})
		.catch((error) => {
			res.status(500).json(error);
		});
};

exports.create = (req, res) => {
	const data = req.body;

	const newPosition = new Position(data);
	newPosition
		.save()
		.then((position) => {
			res.status(200).json({ message: "Position created" });
		})
		.catch((error) => {
			res.status(500).json({ message: "Position not created" });
		});
};

exports.delete = (req, res) => {
	const id = req.params.id;
	Position.findByIdAndDelete(id)
		.then((user) => {
			res.status(200).json({ message: "Position deleted" });
		})
		.catch((error) => {
			res.status(500).json({ message: "Position not deleted" });
		});
};

exports.update = (req, res) => {
	const data = req.body;
	const id = req.params.id;
	Position.findByIdAndUpdate(id, data)
		.then((position) => {
			res.status(200).json({ message: "Position updated" });
		})
		.catch((error) => {
			res.status(500).json({ message: "Position not updated" });
		});
};

exports.search = (req, res) => {
	const query = req.query;
	Position.findOne(query)
		.then((position) => {
			res.status(200).json({ message: "Position Found" });
		})
		.catch((error) => {
			res.status(500).json({ message: "Position not found" });
		});
};
