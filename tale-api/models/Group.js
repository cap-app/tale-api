var mongoose = require('mongoose');

// create project schema
var GroupSchema = new mongoose.Schema({
    groupName: String,
    address: String,
    etaLast: Number,
    user_ids: [String]
});


GroupSchema.statics.findAllUserGroups = async function(user) {
    await this.find({user_ids:  { $all : [ user.id ] }}, function (err, groups) {
        console.log(groups);
        return groups;
    });
};

// Export a model based on the schema
module.exports = mongoose.model('Group', GroupSchema);
