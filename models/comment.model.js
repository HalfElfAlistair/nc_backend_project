const db = require("../db/connection");

exports.removeComment = async (id) => {

    const queryStr = `DELETE 
    FROM comments 
    WHERE comment_id = $1
    RETURNING *;`
    const result = await db.query(queryStr, [id])

    return result.rows;

}