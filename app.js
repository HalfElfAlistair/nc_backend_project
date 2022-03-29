const express = require("express");
const app = express();
const { getTopics } = require("./controllers/topic.controller")

app.use(express.json());

app.get("/api/topics", getTopics);

app.use((req, res, next) => {
    res.status(404).send({ msg: 'path not found' })
})


module.exports = app;