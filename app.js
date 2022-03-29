const express = require("express");
const app = express();
const { getTopics, getArticle } = require("./controllers/controller-connection")

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticle)

app.use((req, res, next) => {
    res.status(404).send({ msg: 'path not found' })
})

app.use((err, req, res, next) => {
    res.status(err.status).send({ msg: err.msg })
})


module.exports = app;