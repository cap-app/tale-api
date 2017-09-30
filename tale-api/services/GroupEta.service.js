var distance = require('google-distance-matrix');
distance.key('AIzaSyAjp_mHqTsLdQ0pNwlpeTqPnFaX_nKOqds');

function getGroupETA(group) {
    var destination = new Array(group.destination);
    var time = [];

    group.users.forEach(function(user) {
        distance.mode(user.mode);
        distance.matrix([user.location], destination, function(err, distance) {
            if (err) {
                return console.log(err);
            }
            if (!distances) {
                return console.log("No Distances returnes by API");
            }
            if (distances.status == 'OK') {
                time.push(distances.row[0].element[0].time.value);
            }
        });
    });

    return time;

}
