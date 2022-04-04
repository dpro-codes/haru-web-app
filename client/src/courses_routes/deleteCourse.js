const haruDB = require('../../../server/haruDB.js');
const Course = haruDB.getCoursesModel();

module.exports = async (req, res, next) => {

  // Fill in the code

  // Finds the employee by id using the URL parameter
  let id = req.params.id;
      
  await Course.findById(id,  (err, course) => {
    // Error and undefined entries handlers
    if(err)
      console.log("Error Selecting : %s ", err); 
    if (!course)
      return res.render('404');

     // Renders view for the user to confirm deletion of the selected coach
    res.render('deleteCourseView',
        {title:"Delete Course?", 
          data: {courseID: course._id,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                courseInstructor: course.courseInstructor,
                coursePrice: course.coursePrice,
                courseVideo: course.courseVideo
          }, layout: 'admin_platform_layout'})
  });    

};
