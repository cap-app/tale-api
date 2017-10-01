const googleMapsClient = require('../node_modules/@google/maps').createClient({
    key: 'AIzaSyAjp_mHqTsLdQ0pNwlpeTqPnFaX_nKOqds',
    Promise: Promise
});
require('mongoose');
const Group = require('../models/Group.js');


async function updateUserEta(user) {
    Group.find({user_ids:  { $in: [ user.id ] }}, function (err, groups) {
        console.log("Groups: " + groups);
        let destination = new Array(groups.length);
        var i = 0;
        groups.forEach(function (group) {
            destination[i] = group.address;
            i++;
        });
        //TESTING HERE NOW
        console.log("from: " + user.location);
        console.log(destination);
        console.log("transit: " + user.transitMode);
        googleMapsClient.distanceMatrix({
            origins: [
                [user.location]
            ],
            destinations:
                destination,
            mode: user.transitMode,

        }).asPromise().then(function(response) {
            if (err) {
                console.log("API SCREWED UP: " + err);
            } else {
                if (response.status === 200) {
                    console.log(response.json.status);
                    console.log(response.json);
                    console.log("Received correct response.");
                    console.log("Start updating group Eta");
                    console.log(response.json.rows[0].elements);
                    for (let i = 0; i < response.json.rows[0].elements.length; i++) {
                        let eta = response.json.rows[0].elements[i].duration.value;
                        console.log("Updating Group: " + i);
                        updateLastEta(eta, groups[i], user.id);
                    }
                    console.log("Update finished");
                } else {
                    console.log("Call was not correct.");
                }
            }
        });
    });
}

 function updateLastEta(eta, group, user_id) {
    for (var i = 0; i < group.user_ids.length; i++) {
        if (user_id === group.user_ids[i]) {
            group.etaUser[i] = eta;
            break;
        }
    }
    group.etaLast = group.etaUser.max();
    group.etaText = parseTime(eta);
    group.save();
    console.log("User was slowest.");
}

function parseTime(eta) {
    let seconds = eta % 60;
    eta = Math.floor(eta/60);
    let minutes = eta % 60;
    eta = Math.floor(eta/60);
    let hours = eta;
    return hours + ":" + minutes + ":" + seconds;
}

exports.updateUserEta = updateUserEta;
