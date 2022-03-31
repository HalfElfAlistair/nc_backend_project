const { getTopics } = require("./topic.controller")
const { getArticle, getArticles, patchArticle } = require("./article.controller")
const { getUsers } = require("./users.controller")

module.exports = { getTopics, getArticle, getArticles, patchArticle, getUsers }