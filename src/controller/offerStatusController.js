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
        message: `OfferStatus with OfferId: ${offerStatus.offer} has been modified`,
        offerStatus,
      });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

exports.deleteOfferStatus = (req, res) => {
  const id = req.params.id;
  OfferStatus.findByIdAndRemove(id)
    .then((offerStatus) => {
      res.status(200).json({ message: `OfferStatus with id: ${offerStatus._id} has been deleted` });
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
  OfferStatus.find({ offerId: query.offerId }, "userId")
    .populate("userId")
    .exec()
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(500).json(error));
};
