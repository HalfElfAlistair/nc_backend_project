const express = require("express");
const app = express();
const { getTopics, getArticle, patchArticle, getUsers, getArticles } = require("./controllers/controller-connection")

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticle)

app.get("/api/users", getUsers)

app.get("/api/articles", getArticles)

app.patch("/api/articles/:article_id", patchArticle)

app.use((req, res, next) => {
    res.status(404).send({ msg: 'path not found' })
})

app.use((err, req, res, next) => {
    // console.log("===========>", err.code)
    const badReqCodes = [ "22P02", "23502" ]
    if (badReqCodes.includes(err.code)) {
        res.status(400).send({ msg: 'bad request' });
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