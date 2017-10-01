const googleMapsClient = require('../node_modules/@google/maps').createClient({
    key: 'AIzaSyAjp_mHqTsLdQ0pNwlpeTqPnFaX_nKOqds',
    Promise: Promise
});
require('mongoose');
const Group = require('../models/Group.js');
const TRAFFIC_MODEL = 'best_guess';


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
        console.log("traffic_model: " + TRAFFIC_MODEL);
        googleMapsClient.distanceMatrix({
            origins: [
                user.location
            ],
            destinations: [
                destination
            ],
            mode: user.transitMode,
         //   traffic_model: TRAFFIC_MODEL

        }).asPromise().then(((response) => {
            console.log("Call returned with response: " + reponse.json.status);
            if (response.status === 'OK') {
                console.log("Received correct response.");
                console.log("Start updating group Eta");
                for (let i = 0; i < response.rows[0].elements.length; i++) {
                    let eta = response.rows[0].elements[i].duration.value;
                    console.log("Updating Group: " + i);
                    updateLastEta(eta, groups[i]);
                }
                console.log("Update finished");
            }
        }, function () {
            console.log("API Call screwed up.")
        }))
    });
}

 function updateLastEta(eta, group) {
    if (eta > group.etaLast) {
        group.etaLast = eta;
        console.log("User was slowest.");
    }
}


exports.updateUserEta = updateUserEta;
