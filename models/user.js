const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

const authSchema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const schemas = {
  authSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
