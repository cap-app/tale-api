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

router.put('/', function (req, res, next) {
    let id = req.body._id;
    Group.findByIdAndUpdate(id, {$push: { user_ids: req.body.user_ids}}, {new: true}, function(err, result) {
        if (err) {
            console.log('Error updating the Group: ' + err);
            res.send({'error':'An error has occurred'});
        } else {
            console.log("successful edit group");
            res.json(result);
        }
    });
});

router.post('/addUser', function (req, res) {
    Group.findById(req.body.id,
        {
            $push: {
                "users": {
                    name: req.body.user.id
                }
            }
        }, { safe: true }, function (err, response) {
            if (err) throw err;
            res.json(response);
        });
});

router.get('/time', function (req, res) {
    Group.findById(req.param.id, function(err, group) {
        if (err) {
            res.send("Error while searching for Group");
        } else {
            res.json({etaLast: group.etaLast});
        }
    })
})

module.exports = router;
