const mongoose = require("mongoose");

// cases Schema
const caseSchema = new mongoose.Schema({
  caseName: { type: String, required: true },
  category: { type: String, required: true },
  neededAmount: { type: Number, required: true },
  address: { type: String },
  isPrivate: { type: String },
  isClosed: { type: Boolean },
  donatedAmount: { type: Number },
  priority: { type: Number },
  userId: { type: mongoose.Schema.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Case", caseSchema);
