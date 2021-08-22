const { User } = require("./../../db/models/user");
const Case = require("./../../db/models/case");

// get user by id function
const getUserById = (req, res) => {
  // const userId = req.params.id;
  const userId = req.token.userId;
  User.findOne({ _id: userId })
    .then((result) => {
      res.status = 200;
      res.json(result);
    })
    .catch((err) => {
      res.status = 400;
      res.json(err);
    });
};

//update user info
const updateUser = (req, res) => {
  console.log("reach user");
  const _id = req.token.userId;
  const update = req.body.update
  User.findByIdAndUpdate(_id, update, { new: true })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.send(err);
    });
};
// get cases by user function
const getMyCases = (req, res) => {
  const userId = req.token.userId;
  Case.find({ userId: userId })
    .then((result) => {
      res.status(200);
      res.json(result);
    })
    .catch((err) => {
      res.status = 400;
      res.json(err);
    });
};

// get cases by user function
const getCasesByUser = (req, res) => {
  const userId = req.params.id;
  Case.find({ userId: userId })
    .then((result) => {
      res.status(200);
      res.json(result);
    })
    .catch((err) => {
      res.status = 400;
      res.json(err);
    });
};

module.exports = {
  getUserById,
  getMyCases,
  getCasesByUser,
  updateUser
};
