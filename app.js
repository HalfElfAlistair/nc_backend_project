const express = require("express");
const app = express();
const { getTopics, getArticle, patchArticle, getUsers, getArticles, getComments, postComment, deleteComment } = require("./controllers/controller-connection")
const cors = require('cors');

app.use(cors());

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticle)

app.get("/api/users", getUsers)

app.get("/api/articles", getArticles)

app.get("/api/articles/:article_id/comments", getComments)

app.patch("/api/articles/:article_id", patchArticle)

app.post("/api/articles/:article_id/comments", postComment)

app.delete("/api/comments/:comment_id", deleteComment)

app.use((req, res, next) => {
    res.status(404).send({ msg: 'path not found' })
})

app.use((err, req, res, next) => {
    const badReqCodes = [ "22P02", "23502", "23503" ]
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