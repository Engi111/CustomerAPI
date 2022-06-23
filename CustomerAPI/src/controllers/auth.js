const authServices = require("../services/auth");

const { createUser } = require("../services/users")

exports.activation = (req, res, next) => {
    authServices.activation()
    .then (data => {res.json(data)})
    .catch(error => {
        console.error(error)
    })
}

exports.login = (req, res, next) => {
    const { email, password} = req.body
    const payload = { email,password}
    authServices.login(req.db,payload)
    .then (data => {res.json(data)})
    .catch(error => {
        console.error(error)
    })
}


