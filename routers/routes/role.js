const role = require("../controllers/role");
const express = require("express");
const roleRouter = express.Router();

roleRouter.post("/", role);

module.exports = roleRouter;
