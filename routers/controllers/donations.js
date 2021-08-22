const Donation = require("../../db/models/donations");
const Case = require("../../db/models/case")
const User = require("../../db/models/user")

const getAllDonations = (req, res) => {
  Donation.find({})
    .populate("caseId", "caseName  neededAmount  donatedAmount")
    .populate("donorId", "nickName")
    .exc()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const addNewDonation = (req, res) => {
  const { caseId, donorId,donationAmount } = req.body;
  const newDonation = new Donation({ caseId, donorId,donationAmount });
  newDonation
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const deleteDonation = (req, res) => {
  const id = req.params.id;
  Donation.findByIdAndDelete(id)
    .then((result) => {
      res.status(200).json("Donation was deleted successfully!");
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const updateDonation = (req, res) => {
  const id = req.params.id;
  const updates = req.body;
  Donation.findByIdAndUpdate(id, updates, { new: true })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = {
  getAllDonations,
  addNewDonation,
  deleteDonation,
  updateDonation,
};
