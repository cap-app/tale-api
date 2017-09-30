const updateUserService = require('../tale-api/services/updateUserEta.js');

function testGroupBasic() {
    let person1 = {userName: "John1",
        location: "49.0044918,8.3899858",
        transitMode: "walking"};
    let person2 = {userName: "Detleff",
        location: "48.974532, 8.439119",
        transitMode: "driving"};
    let group = {groupName: "SWAG MEET",
        address: "48.9875101,8.4204697",
        etaLast: 800,
        users: [person1, person2],};
    updateUserService.updateUserEta(person1);


}

testGroupBasic();
