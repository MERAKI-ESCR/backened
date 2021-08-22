const express = require("express");
const cors = require("cors");
const db = require("./db/db");
const Role = require("./db/models/role");
const app = express();

//routers
const home = require("./routers/routes/home");
const login = require("./routers/routes/auth/login");
const register = require("./routers/routes/auth/register");
const cases = require("./routers/routes/cases");
const role = require("./routers/routes/role");
const profile = require("./routers/routes/profile");
const authentication = require("./routers/middlewares/authentication");
const donation = require("./routers/routes/donations");
const card = require("./routers/routes/card")

//built-in middlewares
app.use(express.json());

//third-party middleware
app.use(cors());

//app routers
app.use(home);

//login router
app.use("/login", login);

//register router
app.use("/register", register);

//user router
app.use("/user", profile);

//cases router
app.use("/cases", cases);

//role router
app.use("/role", role);

//donation router
app.use("/donations", donation);

//card router
app.use("/card",card)

module.exports=app