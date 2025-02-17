const { Schema, model } = require("mongoose");
const Joi = require("joi");

const addSchema = Joi.object({
  title: Joi.string().required(),
  text: Joi.string().required(),
});

const articleShema = new Schema({
  title: String,
  text: String,
});

const Article = model("article", articleShema);

module.exports = {
    Article,
    addSchema
}
