var mongoose = require('mongoose');
const User = require('User.js');

// create project schema
var UserSchema = new mongoose.Schema({
    userName: String,
    location: String,
    transitMode: String,
});

// Export a model based on the schema
module.exports = mongoose.model('User', UserSchema);
