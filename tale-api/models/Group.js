var mongoose = require('mongoose');

// create project schema
var GroupSchema = new mongoose.Schema({
    groupName: String,
    address: String,
    etaLast: number,
    users: Array
});

// Export a model based on the schema
module.exports = mongoose.model('Group', GroupSchema);