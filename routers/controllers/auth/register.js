

const { User } = require("../../../db/models/user");

const register = (req, res) => {
  const { nickName, email, password, age, city, phoneNo, IBAN ,role} = req.body;
  const user = new User({
    nickName,
    email,
    password,
    age,
    city,
    phoneNo,
    IBAN,
    role,
  });

  user
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = {
  register,
};
