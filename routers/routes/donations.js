const express = require("express");
const donationsRouter = express.Router();

const {
  getAllDonations,
  addNewDonation,
  deleteDonation,
  updateDonation,
} = require("../controllers/donations");

donationsRouter.get("/", getAllDonations);
donationsRouter.post("/create", addNewDonation);
donationsRouter.delete("/delete/:id", deleteDonation);
donationsRouter.put("/update/:id", updateDonation);

module.exports = donationsRouter;
