var mongoose = require('mongoose');

// create project schema
var GroupSchema = new mongoose.Schema({
    groupName: String,
    address: String,
    etaLast: Number,
    user_ids: [String],
    etaText: String,
    etaUser: [Number | null],
    icon: String,
    street: String
});

// Export a model based on the schema
module.exports = mongoose.model('Group', GroupSchema);
