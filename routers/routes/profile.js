const express = require("express");
const authentication = require("../middlewares/authentication");
const { getUserById, getMyCases, getCasesByUser,updateUser } = require("./../controllers/profile");

const profileRouter = express.Router();


profileRouter.get("/profile",authentication,getUserById);
profileRouter.get("/cases",authentication, getMyCases);
profileRouter.get("/:id/cases", getCasesByUser);
profileRouter.put("/update/profile",authentication, updateUser)

module.exports = profileRouter;
