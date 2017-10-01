var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = require('../models/User.js');
const userUpdateService = require('../services/updateUserEta');

/* GET users listing. */
router.get('/', function(req, res, next) {
    User.find(function (err, todos) {
        if (err) return next(err);
        res.json(todos);
    });

});

router.post('/', function(req, res, next) {
    User.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

router.put('/', function(req, res, next) {
    console.log(req.body);
    var id = req.body._id;

    User.findByIdAndUpdate(id, {$set: {location: req.body.location}}, {new: true}, function(err, user) {
        if (err) {
            console.log('Error updating location: ' + err);
            res.send({'error':'An error has occurred'});
        } else {
            console.log("Updating location started \n " +
                "Updating User: " +  user);
           userUpdateService.updateUserEta(user).then(function() {
                console.log("Update of User was successful");
            }, function(err) {
                console.log("Updating of User ETA failed: " + err);
            });
           // TODO Change result
            res.json(user);
        }
    });
});

module.exports = router;
