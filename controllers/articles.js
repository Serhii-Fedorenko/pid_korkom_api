const Article = require("../models/article");

const getAll = async (req, res) => {
  const result = await Article.find();
  res.json(result);
};

module.exports = {
    getAll
}
