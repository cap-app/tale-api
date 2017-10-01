var mongoose = require('mongoose');
const User = require('mongoose').model('User').schema;

// create project schema
var GroupSchema = new mongoose.Schema({
    groupName: String,
    address: String,
    etaLast: Number,
    users: [User]
});


GroupSchema.statics.findAllUserGroups = async function(user) {
    await this.find({users:  { $all : [ user ] }}, function (err, groups) {
        console.log(groups);
        return groups;
    });
};

// Export a model based on the schema
module.exports = mongoose.model('Group', GroupSchema);
