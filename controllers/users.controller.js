const { fetchUsers } = require("../models/model-connection");

exports.getUsers = async (req, res, next) => {
                const users = await fetchUsers()
                res.status(200).send({ users }); 
}