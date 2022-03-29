const { fetchArticle } = require("../models/model-connection");

exports.getArticle = async (req, res, next) => {
    const { article_id } = req.params;
    try {
        const article = await fetchArticle(article_id);
        res.status(200).send({ article }); 
    } catch (err) {
        next(err);
    }
}

// exports.patcharticle = async (req, res, next => {

// })