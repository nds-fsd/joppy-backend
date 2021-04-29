const { Offer } = require("../mongo");

exports.createOffer = (req, res) => {
  const data = req.body;

  const newOffer = new Offer(data);

  newOffer
    .save()
    .then(() => res.status(200).json({ message: "Offer created" }))
    .catch((error) => res.status(500).json(error));
};

exports.findAllOffers = (req, res) => {
  Offer.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

exports.findAllOfferIds = (req, res) => {
  Offer.find({}, "_id")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

exports.findOneOffer = (req, res) => {
  const id = req.params.id;
  Offer.findById(id)
    .populate("city", "name")
    .populate("roles")
    .populate("skills")
    .populate({ path: "companyInfo", populate: { path: "skills", model: "Skill" } })
    .exec()
    .then((offer) => {
      res.status(200).json(offer);
    })
    .catch((error) => {
      res.status(500).json(error);
      console.log(error);
    });
};

exports.updateOffer = (req, res) => {
  const data = req.body;
  const id = req.params.id;

  Offer.findByIdAndUpdate(id, data)
    .then((offer) => {
      res.status(200).json({ message: `Offer with id: ${offer._id} has been modified` });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

exports.deleteOffer = (req, res) => {
  const id = req.params.id;
  Offer.findByIdAndRemove(id)
    .then((offer) => {
      res.status(200).json({ message: `Offer with id: ${offer._id} has been deleted` });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

exports.countOffers = (req, res) => {
  Offer.countDocuments({})
    .then((offers) => {
      res.status(200).json(offers);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

exports.searchOffer = (req, res) => {
  const query = req.body;
  Offer.find(query)
    .then((offers) => {
      res.status(200).json(offers);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

exports.searchPagination = (req, res) => {
  const page = Math.max(0, req.query.page);
  const limit = req.query.limit ? Math.max(1, req.query.limit) : 5;
  const sort = req.query.sort;
  const sortDirection = req.query.dir || "asc";

  let sortObject = {};

  if (sort && sortDirection) {
    sortObject[sort] = sortDirection === "asc" ? 1 : -1;
  }

  const skip = page * limit;

  const query = {};

  Offer.find({})
    .limit(limit)
    .skip(skip)
    .sort(sortObject)
    .then((objects) => {
      res.status(200).json(objects);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

exports.searchText = (req, res) => {
  const searchText = Object.keys(req.body).reduce((acc, curr) => `${acc} ${req.body[curr]}`, "");

  const query = { $text: { $search: searchText } };

  Offer.find(query, { score: { $meta: "textScore" } })
    .sort({ score: { $meta: "textScore" } })
    .then((objects) => {
      objects.filter((o) => o.score > 1);
      res.status(200).json(objects);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

// Search by regexp
exports.searchReg = (req, res) => {
  const searchTextReg = req.body.search.split(" ").reduce((acc, curr) => `${acc}.*${curr}`, "");

  const reg = new RegExp(searchTextReg);

  const query2 = { $or: [{ name: { $regex: reg } }, { email: { $regex: reg } }] };

  Offer.find(query2)
    .then((objects) => {
      res.status(200).json(objects);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};
