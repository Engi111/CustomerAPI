const jsonwebtoen = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userServices = require("../services/users")

//create  user
exports.createUser = async (req, res, next) => {
    userServices.createUser(req.db,req.body, req.params.userid)
    .then(data => {res.json(data)})
    .catch( error => {
        console.error(error)
    })
}
//get user by id
exports.getUser = async (req, res, next) => {
    userServices.getUser(req.db,req.body)
    .then(data =>{res.json(data)})
    .catch( error => {
        console.error(error)
    })
}

//get users detail
exports.getUsers = async (req, res, next) => {
    userServices.getUsers(req.db,req.body)
    .then(data =>{res.json(data)})
    .catch( error => {
        console.error(error)
    })
}

//update user
exports.updateUser = (req, res, next) => {
    userServices.updateUser(req.db,req.body,req.params.userid)
    .then (data => {res.json(data)})
    .catch(error => {
        console.error(error)
    })
}

//delete user
exports.deleteUser = async (req, res, next) => {
     userServices.deleteUser(req.db,req.body,req.params.userid)
    .then (data => {res.json(data)})
    .catch(error => {
        console.error(error)
    })
}

exports.changePassword = async (req, res, next) => {
    const {oldPassword, newPassword} = req.body;
    const {email} = req.user;
    userServices.changePassword(req.db,email,oldPassword,newPassword)   
    .then (data => {res.json(data)})
    .catch(error => {
        console.error(error)
    })
}