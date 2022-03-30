const { fetchArticle, updateArticle } = require("../models/model-connection");

exports.getArticle = async (req, res, next) => {
    const { article_id } = req.params;
    try {
        const article = await fetchArticle(article_id);
        res.status(200).send({ article }); 
    } 
    catch (err) {
        next(err);
    }
}

exports.patchArticle = async (req, res, next) => {
    const { article_id } = req.params;
    const { inc_votes } = req.body;
    try {
        const article = await updateArticle(article_id, inc_votes);
        res.status(200).send({ article }); 
    } catch (err) {
        next(err);
    }
}