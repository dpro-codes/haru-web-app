const haruDB = require('../../../server/haruDB.js');
const User = haruDB.getUsersModel();

// Get Users Collection from HaruDB

module.exports.DBusers = async () => {
    let users = await User.find({});

    let results = users.map( emp => {
        let courseNames =  emp.coursesPurchased.map(function(elem){return elem.courseName;}).join(',');
        return {
        userID: emp._id,
        firstName: emp.firstName,
        emailAddress: emp.emailAddress,
        password: emp.password,
        coursesPurchased: courseNames
        }
    })
    return results;
};
