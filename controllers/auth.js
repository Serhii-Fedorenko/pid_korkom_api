const bcrypt = require("bcryptjs");
const { User } = require("../models/user");
const { HttpError, ctrlWrapper } = require("../utils");

const register = async (req, res) => {
  const { name, password } = req.body;
  const user = await User.findOne({ name });

  if (user) {
    throw HttpError(409, "Name already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });
  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
  });
};

module.exports = {
  register: ctrlWrapper(register),
};
