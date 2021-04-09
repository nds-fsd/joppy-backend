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

exports.findOneOffer = (req, res) => {
  const id = req.params.id;
  Offer.findById(id)
    .populate("city")
    .populate("companyInfo")
    .exec()
    .then((offer) => {
      res.status(200).json(offer);
    })
    .catch((error) => {
      res.status(500).json(error);
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
