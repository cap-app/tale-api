var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Group = require('../models/Group.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
    Group.find(function (err, todos) {
        if (err) return next(err);
        res.json(todos);
    });

});

router.post('/', function(req, res, next) {
    Group.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;
