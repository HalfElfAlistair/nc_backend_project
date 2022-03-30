const db = require("../db/connection");

exports.fetchArticle = async (id) => {
    const queryStr = `SELECT * FROM articles WHERE article_id = $1;`
    const result = await db.query(queryStr, [id])
    if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "article not found"})
    }
    return result.rows[0];
}

exports.updateArticle = async (id, voteChange) => {
    const queryStr = `UPDATE articles
    SET
      votes = votes + $1
    WHERE article_id = $2
    RETURNING *;`

    const result = await db.query(queryStr, [voteChange, id]);

    // if (result.rows.length === 0) {
    //     return Promise.reject({ status: 404, msg: "article not found"})
    // }

    return result.rows[0];
}