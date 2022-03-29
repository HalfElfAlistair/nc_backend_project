const db = require("../db/connection");

exports.selectArticle = async (id) => {
    const queryStr = `SELECT * FROM articles WHERE article_id = $1;`
    // const queryStr = `SELECT
    // articles.author,
    // articles.title,
    // articles.article_id,
    // articles.body,
    // articles.topic,
    // articles.created_at,
    // articles.votes
    // FROM articles
    // INNER JOIN users
    // ON articles.author = users.username
    // WHERE article_id = $1;`
    const result = await db.query(queryStr, [id])
    if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "article not found"})
    }
    return result.rows[0];
}