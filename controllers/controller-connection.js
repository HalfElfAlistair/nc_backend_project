const { getTopics } = require("./topic.controller");
const { getArticle, getArticles, patchArticle, getComments, postComment } = require("./article.controller");
const { getUsers } = require("./users.controller");
const { deleteComment } = require("./comment.controller");

module.exports = { getTopics, getArticle, getArticles, patchArticle, getUsers, getComments, postComment, deleteComment }