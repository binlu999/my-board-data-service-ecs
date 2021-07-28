const coService = require('../services/customerorder.service');

const post = function(req, res){
    console.log(req.body);
    res.send({"status":"Success"});
}

const get = function(req, res){
    console.log("id %s",req.params._pkey)
    res.send(coService.get(req.params._pkey))
}

const getAll = function(req, res){
    res.send(coService.getAll())
}

module.exports = {
    post,
    get,
    getAll
};