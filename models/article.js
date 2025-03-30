const { Schema, model } = require("mongoose");
const Joi = require("joi");

const addSchema = Joi.object({
  title: Joi.string().required(),
  text: Joi.string().required(),
  image: Joi.string(),
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
    image: {
      type: String,
      required: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const schemas = {
  addSchema,
};

const Article = model("article", articleShema);

module.exports = {
  Article,
  schemas,
};
