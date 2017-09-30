const googleMapsClient = require('../node_modules/@google/maps').createClient({
    key: 'AIzaSyAjp_mHqTsLdQ0pNwlpeTqPnFaX_nKOqds',
    Promise: Promise
});
var Group = require('mongoose').model('Group');


async function updateUserEta(user) {
    var groups = Group.findAllUserGroups(user);
    var destination = [];
    groups.forEach(function(group) {
      destination.push(group.address);
    });
    await googleMapsClient.distanceMatrix({
        origins: [
            user.location
        ],
        destinations: [
            destination
        ],
        mode: user.transitMode,
        traffic_model: 'best_guess'

    }).asPromise().then(function(response) {
        if (response.status === 'OK') {
            console.log("Received correct response.");
            console.log("Start updating group Eta");
            for (var i = 0; i < response.rows[0].elements.length; i++) {
                var eta = response.rows[0].elements[i].duration.value;
                console.log("Updating Group: " + i);
                updateLastEta(eta, groups[i]);
            }
            console.log("Update finished");
        }
    }, function() {
        console.log("API Call screwed up.")
    });
}

 function updateLastEta(eta, group) {
    if (eta > group.etaLast) {
        group.etaLast = eta;
        console.log("User was slowest.");
    }
}

function findGroups(user) {



    return groups;
}


exports.updateUserEta = updateUserEta;
