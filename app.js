const express = require("express");
const app = express();
const { getTopics, getArticle, patchArticle } = require("./controllers/controller-connection")

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticle)

app.patch("/api/articles/:article_id", patchArticle)

app.use((req, res, next) => {
    res.status(404).send({ msg: 'path not found' })
})

app.use((err, req, res, next) => {
    console.log("===========>", err.code)
    if (err.code === "22P02") {
        res.status(400).send({ msg: 'Bad Request' });
    } else {
        next(err);
    }
})

app.use((err, req, res, next) => {
    if (err.status) {
        res.status(err.status).send({ msg: err.msg })
    } else {
        next(err);
    }
})

app.use((err, req, res, next) => {
    res.status(500).send({ msg: 'Internal Server Error' });
})


module.exports = app;