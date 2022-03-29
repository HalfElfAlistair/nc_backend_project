const { fetchTopics } = require("../models/model-connection");

exports.getTopics = async (req, res, next) => {
                const topics = await fetchTopics()
                res.status(200).send({ topics }); 
}