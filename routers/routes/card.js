const {saveCard, getCardByUserId} = require("../controllers/cards");
const express = require("express");
const authentication = require('../middlewares/authentication')

const cardRouter = express.Router();

cardRouter.post("/",authentication, saveCard);
cardRouter.get("/",getCardByUserId);

module.exports = cardRouter;