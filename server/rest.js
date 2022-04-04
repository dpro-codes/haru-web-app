const haruDB = require('./haruDB.js');
let DBrequestAPI = require("./DBrequestAPI");
const fs = require('fs');

var haruCourses;
var haruCoaches;
var haruUsers;

module.exports.homeAPI = async (req, res ,next) => {
    res.render('restHomeView',);
}

module.exports.coursesJSON = async (req, res ,next) => {
    await DBrequestAPI.getCourses().then(values => {
        haruCourses = values; console.log(haruCourses);
    });
    res.format({
		'application/json':() => {
            let coursesObject = {haruCourses};
            let coursesJSON = JSON.parse(JSON.stringify(coursesObject, null, 4));
			res.json(coursesJSON);
        }
    })
}

module.exports.coursesXML = async (req, res ,next) => {
    await DBrequestAPI.getCourses().then(values => {
        haruCourses = values; console.log(haruCourses);
    });
    res.format({
        'application/xml':() => {
            let coursesData = [];
			for (let course of haruCourses) {
                coursesData.push('	<course> \n' +
                                        '<courseID>' + JSON.stringify(course.courseID) + '</courseID>\n' + 
                                        '<courseName>' + JSON.stringify(course.courseName) + '</courseName>\n' +
                                        '<courseDescription>' + JSON.stringify(course.courseDescription) + '</courseDescription>\n' +
                                        '<courseInstructor>' + JSON.stringify(course.courseInstructor) + '</courseInstructor>\n' +
                                        '<coursePrice>' + JSON.stringify(course.coursePrice) + '</coursePrice>\n' +
                                        '<courseVideos>' + JSON.stringify(course.courseVideos) + '</courseVideos>\n' + 
                                    '</course>')};
			let coursesXML = 
            '<?xml version="1.0"?>\n' + 
                '<haruCourses>' +
                    coursesData.join('') +
                '</haruCourses>'
			res.type('application/xml');
			res.send(coursesXML);
		}
    })
}

module.exports.coachesJSON = async (req, res ,next) => {
    await DBrequestAPI.getCoaches().then(values => {
        haruCoaches = values; console.log(haruCoaches);
    });
    res.format({
		'application/json':() => {
            let coachesObject = {haruCoaches};
            let coachesJSON = JSON.parse(JSON.stringify(coachesObject, null, 4));
			res.json(coachesJSON);
        }
    });
};

module.exports.coachesXML = async (req, res ,next) => {
    await DBrequestAPI.getCoaches().then(values => {
        haruCoaches = values; console.log(haruCoaches);
    });
    res.format({
        'application/xml':() => {
            let coachesData = [];
			for (let coach of haruCoaches) {
                coachesData.push('	<coach> \n' +
                                        '<coachID>' + JSON.stringify(coach.coachID) + '</coachID>\n' + 
                                        '<firstName>' + JSON.stringify(coach.firstName) + '</firstName>\n' +
                                        '<lastName>' + JSON.stringify(coach.lastName) + '</lastName>\n' +
                                        '<emailAddress>' + JSON.stringify(coach.emailAddress) + '</emailAddress>\n' +
                                        '<certifications>' + JSON.stringify(coach.certifications) + '</certifications>\n' +
                                    '</coach>')};
			let coachesXML = 
            '<?xml version="1.0"?>\n' + 
                '<haruCoaches>' +
                    coachesData.join('') +
                '</haruCoaches>'
            res.type('application/xml');
			res.send(coachesXML);
		}
    });
};

module.exports.usersJSON = async (req, res ,next) => {
    await DBrequestAPI.getUsers().then(values => {
        haruUsers = values; console.log(haruUsers);
    });
    res.format({
		// Implement the JSON, XML, & HTML formats. It includes a default format option.
		'application/json':() => {
            let usersObject = {haruUsers};
            let usersJSON = JSON.parse(JSON.stringify(usersObject, null, 4));
			res.json(usersJSON);
        }
    });
};

module.exports.usersXML = async (req, res ,next) => {
    await DBrequestAPI.getUsers().then(values => {
        haruUsers = values; console.log(haruUsers);
    });
    res.format({
        'application/xml':() => {
            let usersData = [];
			for (let user of haruUsers) {
                usersData.push('	<user> \n' +
                                        '<userID>' + JSON.stringify(user.userID) + '</userID>\n' + 
                                        '<userRole>' + JSON.stringify(user.userRole) + '</userRole>\n' + 
                                        '<firstName>' + JSON.stringify(user.firstName) + '</firstName>\n' +
                                        '<lastName>' + JSON.stringify(user.lastName) + '</lastName>\n' +
                                        '<emailAddress>' + JSON.stringify(user.emailAddress) + '</emailAddress>\n' +
                                        '<password>' + JSON.stringify(user.password) + '</password>\n' +
                                        '<coursesPurchased>' + JSON.stringify(user.coursesPurchased) + '</coursesPurchased>\n' +
                                    '</user>')};
			let usersXML = 
            '<?xml version="1.0"?>\n' + 
                '<haruUsers>' +
                    usersData.join('') +
                '</haruUsers>'
            res.type('application/xml');
			res.send(usersXML);
		}
    });
};

module.exports.AJAXrequest = async (req, res ,next) => {
    let emailAddress = req.body.emailAddress;
    res.render('AJAXrequestView',{emailAddress, layout: 'no_logo_layout.handlebars'});
};

module.exports.userEmailJSON = async (req, res ,next) => {
    let email = req.params.emailAddress;
    console.log(email);

    await DBrequestAPI.getUsers().then(values => {
        haruUsers = values; console.log(haruUsers);
    });
    let user = haruUsers.find(user => user.emailAddress === email);
    if (user == null) {res.send("There is no user associated with the email address: " + email +".")}
    res.format({
		// Implement the JSON, XML, & HTML formats. It includes a default format option.
		'application/json':() => {
            let userObject = {user};
            let userJSON = JSON.parse(JSON.stringify(userObject, null, 4));
            res.json(userJSON);
        }
    });
};

module.exports.userEmailXML = async (req, res ,next) => {
    let email = req.params.emailAddress;
    
    await DBrequestAPI.getUsers().then(values => {
        haruUsers = values; console.log(haruUsers);
    });
    let user = haruUsers.find(user => user.emailAddress === email);
    if (user == null) {res.send("There is no user associated with the email address: " + email +".")}
    res.format({
        'application/xml':() => {
            let userData = [
                    '<userID>' + JSON.stringify(user.userID) + '</userID>\n' + 
                    '<userRole>' + JSON.stringify(user.userRole) + '</userRole>\n' + 
                    '<firstName>' + JSON.stringify(user.firstName) + '</firstName>\n' +
                    '<lastName>' + JSON.stringify(user.lastName) + '</lastName>\n' +
                    '<emailAddress>' + JSON.stringify(user.emailAddress) + '</emailAddress>\n' +
                    '<password>' + JSON.stringify(user.password) + '</password>\n' +
                    '<coursesPurchased>' + JSON.stringify(user.coursesPurchased) + '</coursesPurchased>\n'
            ];

			let userXML = 
            '<?xml version="1.0"?>\n' + 
                '<haruUser>' +
                    userData.join('') +
                '</haruUser>'
            res.type('application/xml');
			res.send(userXML);
		}
    });
};