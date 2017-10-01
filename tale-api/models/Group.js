var mongoose = require('mongoose');
var User = require('User.js');

// create project schema
var GroupSchema = new mongoose.Schema({
    groupName: String,
    address: String,
    etaLast: Number,
    users: [User]
});


GroupSchema.statics.findAllUserGroups = function(user) {
    return this.find({users:  { $all : [ user ] }}).toObject();
};

// Export a model based on the schema
module.exports = mongoose.model('Group', GroupSchema);
