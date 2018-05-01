var mongoose = require('mongoose');
//Defining Schema
var studentSchema = mongoose.Schema({


    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    mob: {
        type: String,
        required: true
    },

    quantity: {
        type: String,
        required: true
    },

    price: {
        type: String,
        required: true
    }
});

var Retailpackage = module.exports = mongoose.model('retailcollection', studentSchema); //Binding schema

module.exports.addStudent = function(data, callback) {
    Retailpackage.create(data, callback);
}
module.exports.getStudentByField = function(ret, callback) {
    Retailpackage.find({name:ret}, callback);
}


module.exports.updateStudent = function(name, data, options, callback) {
    var query = {
        name: name
    };
    var update = {
        name: data.name,
        email: data.email,
        mob: data.mob,
        quantity: data.quantity,
        price: data.price
    }
    Retailpackage.findOneAndUpdate(query, update, options, callback);
}


module.exports.removeStudent = function (name, callback) {
    var query = {
        name: name
    };
    Retailpackage.remove(query, callback);
}


module.exports.getDetails = function(callback) {
    Retailpackage.find(callback);
}


