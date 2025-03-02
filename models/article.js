const { Schema, model } = require("mongoose");
const Joi = require("joi");

const addSchema = Joi.object({
  title: Joi.string().required(),
  text: Joi.string().required(),
});

const articleShema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Article = model("article", articleShema);

module.exports = {
  Article,
  addSchema,
};
