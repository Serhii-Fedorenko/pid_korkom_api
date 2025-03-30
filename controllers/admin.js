const { Article, schemas } = require("../models/article");
const { HttpError, ctrlWrapper, cloudinary } = require("../utils");
const fs = require("fs/promises");

const getAll = async (req, res) => {
  const result = await Article.find();
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Article.findById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const add = async (req, res) => {
  const { error } = schemas.addSchema.validate(req.body);

  if (error) {
    throw HttpError(400, error.message);
  }

  let imageUrl = null;

  if (req.file) {
    const { path: tempUpload } = req.file;
    const result = await cloudinary.uploader.upload(tempUpload, {
      folder: "articles",
    });
    imageUrl = result.secure_url;
    await fs.unlink(tempUpload);
  }

  const result = await Article.create({ ...req.body, image: imageUrl });
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await Article.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await Article.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "Deleted successfully" });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
