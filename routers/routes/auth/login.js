const express = require("express");

const { login } = require("./../../controllers/auth/login");

const loginRouter = express.Router();

loginRouter.post("/", login);

module.exports = loginRouter;
