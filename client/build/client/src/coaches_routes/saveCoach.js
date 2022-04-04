const haruDB = require('../../../server/haruDB.js');
const Coach = haruDB.getCoachesModel();
const Course = haruDB.getCoursesModel();

var haruCourse;


module.exports = async (req , res , next) => {
 
    // Fill in the code
    let coachCertifications = req.body.certs;
    let certsArray = coachCertifications.split('/');
    var coachCertArray = [];
    for (var cert of certsArray) {
      let course = await Course.find({courseName: cert});
      coachCertArray.push(course)
    }
    let flatCoachArray = coachCertArray.reduce(
      ( accumulator, currentValue ) => accumulator.concat(currentValue),[]);

    // Creates new entry in the database using the input from the user for first and last name
    let coach = await new Coach({
      firstName: req.body.fname,
      lastName: req.body.lname,
      emailAddress: req.body.email,
      certifications: flatCoachArray
    }); 
    
    // Saves new coach and redirects to display all coaches
    coach.save((err) => {
      if(err)
        console.log("Error : %s ",err);
      res.redirect('/admin/coaches');
    });
};
