const db = require("../db/connection");

exports.selectTopics = async () => {
    const result = await db.query(`SELECT * FROM topics;`)
    // console.log("===========>", Object.keys(result.rows[0]))
    return { topics: result.rows };
}