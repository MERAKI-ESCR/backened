const Role = require("../../db/models/role");

const role = (req, res) => {
  const { role, permissions } = req.body;
  const newRole = new Role({ role, permissions });
  newRole
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = role;
