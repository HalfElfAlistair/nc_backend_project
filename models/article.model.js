const db = require("../db/connection");

exports.fetchArticle = async (id) => {
    // query joins articles and comments tables on article_id, counts the number of comments matching an article_id and groups the data by this. It is then arranged to only query a chosen id value.
    const queryStr = `SELECT articles.*,
    CAST(COUNT(comments.comment_id) AS int) AS comment_count
    FROM articles
    LEFT JOIN comments ON comments.article_id = articles.article_id
    GROUP BY articles.article_id
    HAVING articles.article_id = $1;`
    
    const articlesData = await db.query(queryStr, [id])

    if (articlesData.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "article not found"})
    }

    return articlesData.rows[0];
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

exports.fetchArticles = async (topic, sort_by = "created_at", order = "desc") => {
    let queryStr = `SELECT articles.*,
    CAST(COUNT(comments.comment_id) AS int) AS comment_count
    FROM articles
    LEFT JOIN comments ON comments.article_id = articles.article_id
    GROUP BY articles.article_id`

    let queryArray = [];

    if (!["created_at", "votes", "comment_count"].includes(sort_by)) {
        return Promise.reject({ status: 400, msg: 'invalid sort query' });
    }

    if (!["asc", "desc"].includes(order)) {
        return Promise.reject({ status: 400, msg: 'invalid order query' });
    }

    if (topic !== undefined) {
        queryStr += ` HAVING topic = $1`;
        queryArray.push(topic);
    }

    queryStr += ` ORDER BY ${sort_by} ${order};`;

    const articlesData = await db.query(queryStr, queryArray)

    return articlesData.rows;
}

exports.fetchComments = async (id) => {
    const queryStr = `SELECT 
    comment_id,
    votes,
    created_at,
    author,
    body
    FROM comments
    WHERE article_id = $1;`

    const commentsData = await db.query(queryStr, [id])

    const idQuery = `SELECT 
        article_id 
        FROM articles 
        WHERE article_id = $1`
    const idCheck = await db.query(idQuery, [id])

    if ((commentsData.rows.length === 0) && (idCheck.rows.length === 0)) {
        return Promise.reject({ status: 404, msg: "article not found"})
    }

    return commentsData.rows;
}

exports.addComment = async (id, comment) => {
    const { username, body} = comment;
    if (body.length < 1) {
        return Promise.reject({ status: 400, msg: "bad request"})
    }
    const queryStr = `INSERT INTO comments
    (body, article_id, author)
    VALUES
    ($1, $2, $3)
    RETURNING *;`
    const commentInsert = await db.query(queryStr, [body, id, username])
    return commentInsert.rows[0];
}