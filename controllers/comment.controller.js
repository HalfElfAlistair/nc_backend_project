const { removeComment } = require("../models/model-connection");

exports.deleteComment = async (req, res, next) => {
    
    const { comment_id } = req.params;

    try {
        const deletion = await removeComment(comment_id);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
}