const haruDB = require('../../../server/haruDB.js');
const Course = haruDB.getCoursesModel();

module.exports = async (req , res , next) => {
 
    // Fill in the code

    // Creates new entry in the database using the input from the user for first and last name
    let course = await new Course({
      courseName: req.body.name,
      courseDescription: req.body.description,
      courseInstructor: req.body.instructor,
      coursePrice: req.body.price,
      courseVideo: req.body.video
    }); 
 
    // Saves new coach and redirects to display all coaches
    course.save((err) => {
      if(err)
        console.log("Error : %s ",err);
      res.redirect('/admin/courses');
    });
};
