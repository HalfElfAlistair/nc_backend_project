const { fetchArticle, updateArticle, fetchArticles, fetchComments, addComment } = require("../models/model-connection");

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

exports.getArticles = async (req, res, next) => {
    const { topic, sort_by, order } = req.query;
    try {
        const articles = await fetchArticles(topic, sort_by, order)
        res.status(200).send({ articles }); 
    } catch (err) {
        next(err);
    }
}

exports.getComments = async (req, res, next) => {
    const { article_id } = req.params;
    try {
        const comments = await fetchComments(article_id);
        res.status(200).send({ comments }); 
    } catch (err) {
        next(err);
    }
}

exports.postComment = async (req, res, next) => {
    const { article_id } = req.params;
    const newComment = req.body;
    try {
        const comment = await addComment(article_id, newComment);
        res.status(201).send({ comment }); 
    } catch (err) {
        next(err);
    }
}