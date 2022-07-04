const adminQueryServices = require("../services/adminQuery");

exports.getUsers = async (req, res, next) => {
    let {page, limit, filter} = req.query
    page = +req.query.page
    limit = +req.query.limit
    adminQueryServices.getUsers(req.db,{page,limit}, filter)
    .then(data =>{res.json(data)})
    .catch( error => {
        console.error(error)
    })
}

exports.searchUsers = async (req,res,next) => {
    let {page,limit} = req.query;
    let sort = req.body.sort;
    let filter = req.body.filter;
    page = +page;
    limit = +limit;
    adminQueryServices.searchUsers(req.db,{page,limit},filter,sort)
        .then(data=>res.json(data))
        .catch(error=>next(error))
}