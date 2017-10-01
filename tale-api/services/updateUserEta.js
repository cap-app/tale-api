const googleMapsClient = require('../node_modules/@google/maps').createClient({
    key: 'AIzaSyAjp_mHqTsLdQ0pNwlpeTqPnFaX_nKOqds',
    Promise: Promise
});
require('mongoose');
const Group = require('../models/Group.js');


async function updateUserEta(user) {
    Group.find({user_ids:  { $in: [ user.id ] }}, function (err, groups) {
        console.log("Groups: " + groups);
        let destination = [];
        groups.forEach(function (group) {
            destination.push(group.address);
        });
        //TESTING HERE NOW
        console.log("from: " + user.location);
        console.log("to: " + destination);
        console.log("transit: " + user.transitMode);
        googleMapsClient.distanceMatrix({
            origins: [
                user.location
            ],
            destinations: [
                destination
            ],
            mode: user.transitMode,

        }).asPromise().then(function(response) {
            if (err) {
                console.log("API SCREWED UP: " + err);
            } else {
                if (response.status === 200) {
                    console.log("Received correct response.");
                    console.log("Start updating group Eta");
                    console.dir(response.json.results);
                    for (let i = 0; i < response.json.results.rows[0].elements.length; i++) {
                        let eta = response.json.results.rows[0].elements[i].duration.value;
                        console.log("Updating Group: " + i);
                        updateLastEta(eta, groups[i]);
                    }
                    console.log("Update finished");
                } else {
                    console.log("Call was not correct.");
                }
            }
        });
    });
}

 function updateLastEta(eta, group) {
    if (eta > group.etaLast) {
        group.etaLast = eta;
        group.save();
        console.log("User was slowest.");
    }
}


exports.updateUserEta = updateUserEta;
