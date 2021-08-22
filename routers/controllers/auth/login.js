const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const { User } = require("./../../../db/models/user");

const login = (req, res) => {
  const { email, password } = req.body;
  console.log("IN LOGIN");
  let result1;
  User.findOne({ email: email.toLowerCase() })

    .then(async (result) => {
      result1 = result;
      if (result === null) {
        console.log(result);
        res.status = 404;
        res.json("The email doesn't exist");
      } else {
        console.log(result);
        await bcrypt.compare(password, result.password, (err, result) => {
          if (err) {
            res.send(err);
          }
          if (result === true) {
            res.status = 200;
            const payload = {
              userId: result1._id,
              role: result1.role._id,
            };
            const options = {
              expiresIn: "4h",
            };
            const secret = process.env.SECRET;
            const token = jwt.sign(payload, secret, options);

            res.json({ token: token ,result: result1 });
          } else {
            res.status = 403;
            res.json("The password you’ve entered is incorrect");
          }
        });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

module.exports = {
  login,
};
