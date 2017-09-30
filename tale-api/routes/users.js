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
    User.findOneAndUpdate({'_id': req.query.id}, {$set: {location: req.query.location}}, function(err, result) {
        if (err) {
            console.log('Error updating location: ' + err);
            res.send({'error':'An error has occurred'});
        } else {
            console.log("Updating location successful");
            userUpdateService.updateUserEta(this);
            res.json(result);
        }
    });
});

module.exports = router;
