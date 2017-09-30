var mongoose = require('mongoose');

// create project schema
var UserSchema = new mongoose.Schema({
    userName: String,
    location: String,
    transitMode: String,
});

// Export a model based on the schema
module.exports = mongoose.model('User', UserSchema);
