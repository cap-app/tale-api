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

/**
 * Creation of new group
 */
router.post('/', function(req, res, next) {
    Group.create(req.body, function (err, createdGroup) {
        if (err) return next(err);
        res.json(createdGroup);
    });
});

/**
 * Adding users to a group
 */
router.put('/', function (req, res, next) {
    let update = req.body;
    let id = update._id;
    Group.findByIdAndUpdate(id, {$push: { user_ids: update.user_ids}}, {new: true}, function(err, result) {
        if (err) {
            console.log('Error updating the Group: ' + err);
            res.send({'error':'An error has occurred'});
        } else {
            console.log("successful edit group");
            res.json(result);
        }
    });
});

/**
 * Just getting time without to much information
 */
router.get('/time/:id', function (req, res) {
    Group.findById(req.params.id, function(err, group) {
        if (err) {
            res.send(err);
        } else {
            res.json({etaLast: group.etaLast});
        }
    })
});

router.get('/user/:id', function (req, res) {
    Group.find({_id: req.params.id}, function (err, groups) {
        if (err) {
            res.send(err);
        } else {
            res.json(groups);
        }
    })
})


router.delete('/', function (req, res) {
    Group.findByIdAndRemove(req.body.id, function(err, group) {
        if (err) {
            res.send(err);
        } else {
            res.json(group);
        }
    })
})

module.exports = router;
