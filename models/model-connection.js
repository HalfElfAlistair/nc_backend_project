const { fetchTopics } = require("./topic.model")
const { fetchArticle, fetchArticles, updateArticle } = require("./article.model")
const { fetchUsers } = require("./users.model")

module.exports = { fetchTopics, fetchArticle, fetchArticles, updateArticle, fetchUsers }