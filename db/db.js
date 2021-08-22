const mongoose = require("mongoose");
require("dotenv").config();

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};
// connecting mongoose
mongoose
  .connect(process.env.DB_URI, options)
  .then(() => console.log("connection made successfully"))
  .catch((err) => console.log("error message", err.message));

// mongoose.connect(process.env.DB_URI, options).then(() => console.log('connection made successfully')).catch(err => console.log('error message', err.message))
