const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// users schema
const userSchema = new mongoose.Schema({
  nickName: { type: String, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number},
  city: { type: String},
  phoneNo: { type: String },
  IBAN: { type: String },
  role: { type: mongoose.Schema.ObjectId, ref: "Role",default: '60c460bb1d246d3110e885fa'
},
});


// hash the password and lowercase of email before save on userSchema
userSchema.pre("save", async function () {
  this.email = this.email.toLowerCase();
  this.password = await bcrypt.hash(this.password, 10);
});

module.exports.User = mongoose.model("User", userSchema);
