const { User } = require("../models/user");
const { HttpError, ctrlWrapper } = require("../utils");

const register = async (req, res) => {
  const { name } = req.body;
  const user = await User.findOne({name});

  if (user) {
    throw HttpError(409, "Name already in use");
  }

  const newUser = await User.create(req.body);
  res.status(201).json({
    name: newUser.name,
  });
};

module.exports = {
  register: ctrlWrapper(register),
};
