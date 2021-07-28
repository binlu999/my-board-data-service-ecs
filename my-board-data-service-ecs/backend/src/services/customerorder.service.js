const data = require('../data');

const get = function(_id){
    return getAll().find(order => order.PKEY == _id);
}

const getAll = function(){
    return data.CUSTOMERORDER;
}

module.exports = {
    get,
    getAll
};
