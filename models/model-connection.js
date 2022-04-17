const { fetchTopics } = require("./topic.model");
const { fetchArticle, fetchArticles, updateArticle, fetchComments, addComment } = require("./article.model");
const { fetchUsers } = require("./users.model");
const { removeComment } = require("./comment.model");

module.exports = { fetchTopics, fetchArticle, fetchArticles, updateArticle, fetchComments, fetchUsers, addComment, removeComment }