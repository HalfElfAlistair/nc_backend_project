const db = require("../db/connection");

exports.removeComment = async (id) => {

    const queryStr = `DELETE 
    FROM comments 
    WHERE comment_id = $1
    RETURNING *;`
    const result = await db.query(queryStr, [id])

    if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "comment not found"})
    }

    return result.rows;

}