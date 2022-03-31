const db = require("../db/connection");

exports.fetchArticle = async (id) => {
    // query joins articles and comments tables on article_id, counts the number of comments matching an article_id and groups the data by this. It is then arranged to only query a chosen id value.
    const queryStr = `SELECT articles.*,
    COUNT(comments.comment_id) AS comment_count
    FROM articles
    LEFT JOIN comments ON comments.article_id = articles.article_id
    GROUP BY articles.article_id
    HAVING articles.article_id = $1;`
    
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

    return result.rows[0];
}