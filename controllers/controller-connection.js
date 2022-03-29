const { getTopics } = require("./topic.controller")
const { getArticle, patchArticle } = require("./article.controller")

module.exports = { getTopics, getArticle, patchArticle }