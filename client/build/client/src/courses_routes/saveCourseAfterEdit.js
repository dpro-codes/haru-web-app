const haruDB = require('../../../server/haruDB.js');
const Course = haruDB.getCoursesModel();

module.exports = async (req, res, next) => {

  // Fill in the code

  // Finds the coach by id corresponding to the coach selected
  let id = req.body.id;

  await Course.findById(id, (err, course) => {
    // Error and undefined entries handlers
    if(err)
      console.log("Error Selecting : %s ", err); 
    if (!course)
      return res.render('404');
    
    //  Changes the coach's properties with the new values
    course.courseName = req.body.name;
    course.courseDescription = req.body.description;
    course.courseInstructor = req.body.instructor;
    course.coursePrice = req.body.price;
    course.courseVideo = req.body.video;
    
    // Saves to the database, and redirects to /coaches
    course.save((err) => {
      if (err)
        console.log("Error updating : %s ",err );
      res.redirect('/admin/courses');
    });

  });
    
};
