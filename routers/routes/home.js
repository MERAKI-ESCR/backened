const express = require("express");

const { getHome } = require("./../controllers/home");

const homeRouter = express.Router();

homeRouter.get("/", getHome);

module.exports = homeRouter;