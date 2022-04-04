const haruDB = require('./haruDB.js');
const Course = haruDB.getCoursesModel();
const Coach = haruDB.getCoachesModel();
const User = haruDB.getUsersModel();

module.exports.getCourses = async () => {
    let courses = await Course.find({});
    let haruCourses = courses.map( emp => {
        priceFormatted = (emp.coursePrice).toFixed(2);
        return {
            courseID: emp._id,
            courseName: emp.courseName,
            courseDescription: emp.courseDescription,
            courseInstructor: emp.courseInstructor,
            coursePrice: priceFormatted,
            courseVideos: emp.courseVideos,
        }
    });
    return haruCourses; 
};

module.exports.getCoaches = async () => {
    let coaches = await Coach.find({});
    let haruCoaches = coaches.map( emp => {
        let certificationNames =  emp.certifications.map(function(elem){return elem.courseName;}).join(',');
        return {
            coachID: emp._id,
            firstName: emp.firstName,
            lastName: emp.lastName,
            emailAddress: emp.emailAddress,
            password: emp.password,
            certifications: certificationNames
        }
    });
    return haruCoaches; 
};

module.exports.getUsers = async () => {
    let users = await User.find({});
    let haruUsers = users.map( emp => {
        let courseNames =  emp.coursesPurchased.map(function(elem){return elem.courseName;}).join(',');
        return {
        userID: emp._id,
        userRole: emp.role,
        firstName: emp.firstName,
        emailAddress: emp.emailAddress,
        password: emp.password,
        coursesPurchased: courseNames
        }
    });
    return haruUsers; 
};
