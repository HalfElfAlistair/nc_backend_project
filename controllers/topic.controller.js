const { selectTopics } = require("../models/topic.model");

exports.getTopics = async (req, res) => {
        let topics = await selectTopics()
        return res.status(200).send(topics);
}