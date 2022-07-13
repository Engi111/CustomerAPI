const authServices = require("../services/auth");

const { createUser } = require("../services/users")

// exports.activation = (req, res, next) => {
//     authServices.activation()
//     .then (data => {res.json(data)})
//     .catch(error => {
//         console.error(error)
//     })
// }

exports.login = (req, res, next) => {
    const { email, password} = req.body
    const payload = { email,password}
    authServices.login(req.db,payload)
    .then (data => {res.json(data)})
    .catch(error => {
        console.error(error)
    })
}

exports.logout = (req, res, next) => {
    const {email} = req.user
    authServices.logout(req.db,email)
    .then (data => {res.json(data)})
    .catch(error => {
        console.error(error)
    })
}

exports.linkActivation = (req, res, next) => {
    
    authServices.linkActivation(req.db,req.params.token, req.params.userid)
    .then (data => {res.json(data)})
    .catch(error => {
        console.error(error) 
    })
}
