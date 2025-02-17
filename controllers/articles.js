const { Article, addSchema } = require("../models/article");
const { HttpError } = require("../utils");

const getAll = async (req, res, next) => {
  try {
    const result = await Article.find();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Article.findById(id);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await Article.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Article.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Article.findByIdAndDelete(id);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  add,
  updateById,
  deleteById
};
