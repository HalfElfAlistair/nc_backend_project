const { getTopics } = require("./topic.controller")
const { getArticle, patchArticle } = require("./article.controller")
const { getUsers } = require("./users.controller")

module.exports = { getTopics, getArticle, patchArticle, getUsers }