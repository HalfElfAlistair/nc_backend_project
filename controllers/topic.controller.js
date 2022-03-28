const { selectTopics } = require("../models/topic.model");

exports.getTopics = async (req, res, next) => {
        let topics = await selectTopics()
        res.status(200).send(topics);   
}