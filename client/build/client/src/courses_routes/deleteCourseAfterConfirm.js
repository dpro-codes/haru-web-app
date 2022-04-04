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

    //  Removes the coach from the database, and redirects to /coaches
    course.remove( (err) => {
      if (err)
        console.log("Error deleting : %s ",err );
      res.redirect('/admin/courses');
    });  

  }); 

};

  