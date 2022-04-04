const haruDB = require('./haruDB.js');
const Coach = haruDB.getCoachesModel();
const Course = haruDB.getCoursesModel();

// display employees

module.exports = async (req, res ,next) => {
    let coaches = await Coach.find({});
    let coaches_results = await coaches.map( emp => {
        let certificationNames =  emp.certifications.map(function(elem){return elem.courseName;}).join(' / ');
        return {
            id: emp._id,
            firstName: emp.firstName,
            lastName: emp.lastName,
            emailAddress: emp.emailAddress,
            certifications: certificationNames
        }
    });


    let courses = await Course.find({});
    let courses_results = await courses.map( emp => {
        priceFormatted = (emp.coursePrice).toFixed(2);
        return {
            courseID: emp._id,
            courseName: emp.courseName,
            courseDescription: emp.courseDescription,
            courseInstructor: emp.courseInstructor,
            coursePrice: priceFormatted
        }
    });
        
    res.render('displayAdminView',
            {title:"Haru Admin", coaches_data:coaches_results, courses_data:courses_results, layout: 'admin_platform_layout'});
        
};