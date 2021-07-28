const coService = require('../services/customerorder.service');

const post = function(req, res){
    console.log(req.body);
    res.send({"status":"Success"});
}

const get = function(req, res){
    res.send(coService.get(req.params._id))
}

const getAll = function(req, res){
    res.send(coService.getAll())
}

module.exports = {
    post,
    get,
    getAll
};