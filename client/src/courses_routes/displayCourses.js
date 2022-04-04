const haruDB = require('../../../server/haruDB.js');
const Course = haruDB.getCoursesModel();

// display employees

module.exports = async (req, res ,next) => {

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

    res.render('displayCoursesView',
            {title:"List of Courses", data: haruCourses, layout: 'admin_platform_layout'});
        
};
