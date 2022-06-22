const authServices = require("../services/auth");

const { createUser } = require("../services/users")

exports.activation = (req, res, next) => {
    authServices.activation()
    .then (data => {res.json(data)})
    .catch(error => {
        console.error(error)
    })
}


