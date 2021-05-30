const { OfferStatus, Offer } = require("../mongo");

exports.createOfferStatus = (req, res) => {
  const data = req.body;

  const newOfferStatus = new OfferStatus(data);

  newOfferStatus
    .save()
    .then((offerStatus) => res.status(200).json(offerStatus))
    .catch((error) => res.status(500).json(error));
};

exports.findAllOfferStatus = (req, res) => {
  OfferStatus.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

exports.findOneOfferStatus = (req, res) => {
  const id = req.params.id;
  OfferStatus.findById(id)
    .then((offer) => {
      res.status(200).json(offer);
    })
    .catch((error) => {
      res.status(500).json(error);
      console.log(error);
    });
};

exports.updateOfferStatus = (req, res) => {
  const data = req.body;
  const id = req.params.id;

  OfferStatus.findByIdAndUpdate(id, data)
    .then((offerStatus) => {
      res.status(200).json({
        message: `OfferStatus with OfferId: ${offerStatus._id} has been modified`,
      });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};
exports.deleteOfferStatus = (req, res) => {
  const id = req.params.id;
  OfferStatus.findByIdAndDelete(id)
    .then((offerStatus) => {
      res.status(200).json({
        message: `OfferStatus with OfferId: ${offerStatus.offer} has been deleted`,
        offerStatus,
      });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

exports.findAcceptedOfferStatus = (req, res) => {
  const query = req.body;

  OfferStatus.findOne({ userId: query.userId, offerId: query.offerId, accepted: true })
    .then((offerStatus) => {
      res.status(200).json(offerStatus);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

exports.filterOffers = (req, res) => {
  const query = req.body;

  OfferStatus.find({ userId: query.userId })
    .then((array) => {
      return array.map((item) => item.offerId);
    })
    .then((arrayIds) =>
      Offer.find({ _id: { $nin: arrayIds } }, "_id")
        .sort({ salary: -1 })
        .exec()
        .then((offers) => {
          res.status(200).json(offers);
        })
        .catch((error) => {
          res.status(500).json(error);
        })
    )
    .catch((error) => {
      res.status(500).json(error);
    });
};

exports.showCandidates = (req, res) => {
  const query = req.body;
  OfferStatus.find({ offerId: query.offerId })
    .populate("userId")
    .exec()
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(500).json(error));
};

exports.showAcceptedOffers = (req, res) => {
  const query = req.body;

  OfferStatus.find({ userId: query.userId, accepted: true })
    .populate("offerId")
    .populate({
      path: "offerId",
      populate: { path: "companyInfo", model: "User" },
    })
    .populate({
      path: "offerId",
      populate: { path: "position", model: "Position" },
    })
    .populate({
      path: "offerId",
      populate: { path: "skills", model: "Skill" },
    })
    .populate({
      path: "offerId",
      populate: { path: "location", model: "City" },
    })
    .populate({
      path: "offerId.companyInfo",
      populate: { path: "tech", model: "Skill" },
    })
    .exec()
    .then((offers) => {
      res.status(200).json(offers);
    })
    .catch((error) => res.status(500).json(error));
};

exports.showSnoozedOffers = (req, res) => {
  const query = req.body;

  OfferStatus.find({ userId: query.userId, snoozed: true })
    .sort({ salary: -1 })
    .populate("offerId")
    .populate({
      path: "offerId",
      populate: { path: "companyInfo", model: "User" },
    })
    .populate({
      path: "offerId",
      populate: { path: "position", model: "Position" },
    })
    .populate({
      path: "offerId",
      populate: { path: "skills", model: "Skill" },
    })
    .populate({
      path: "offerId",
      populate: { path: "location", model: "City" },
    })
    .populate({
      path: "offerId.companyInfo",
      populate: { path: "tech", model: "Skill" },
    })
    .exec()
    .then((offers) => {
      res.status(200).json(offers);
    })
    .catch((error) => res.status(500).json(error));
};
