const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  caseId: { type: mongoose.Schema.ObjectId, ref: "Case" },
  donorId: { type: mongoose.Schema.ObjectId, ref: "User" },
  donationAmount :{type: Number}
});

module.exports = mongoose.model("Donation", donationSchema);
