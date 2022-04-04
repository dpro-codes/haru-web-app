const haruDB = require('../../../server/haruDB.js');
const User = haruDB.getUsersModel();

// display employees

module.exports = async (req, res ,next) => {

    let users = await User.find();

    let results = users.map( emp => {
        return {
            firstName: emp.firstName,
            lastName: emp.lastName,
            emailAddress: emp.emailAddress,
            password: emp.password
        }
    });

    res.render('displayUsersView',
    {title:"List of Users", data:results, layout: 'admin_platform_layout'});

};
