const express = require("express");

const { register } = require("./../../controllers/auth/register");

const createUser = express.Router();

createUser.post("/",register);

module.exports = createUser;
