const {Schema, model} = require('mongoose');

const articleShema = new Schema({
    title: String,
    text: String
})

const Article = model('article', articleShema);

module.exports = Article;

