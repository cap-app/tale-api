var mongoose = require('mongoose');

// create project schema
var GroupSchema = new mongoose.Schema({
    groupName: String,
    address: String,
    etaLast: Number,
    users: Array
});


GroupSchema.statics.findAllUserGroups = function(user) {
    return this.find({users:  { $all : [user] }});
};

// Export a model based on the schema
module.exports = mongoose.model('Group', GroupSchema);
