const { selectArticle } = require("../models/article.model");

exports.getArticle = async (req, res, next) => {
    const article = await selectArticle()
}