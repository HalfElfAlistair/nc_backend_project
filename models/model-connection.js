const { fetchTopics } = require("./topic.model")
const { fetchArticle, updateArticle } = require("./article.model")
const { fetchUsers } = require("./users.model")

module.exports = { fetchTopics, fetchArticle, updateArticle, fetchUsers }