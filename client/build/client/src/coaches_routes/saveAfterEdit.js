const haruDB = require('../../../server/haruDB.js');
const Coach = haruDB.getCoachesModel();
const Course = haruDB.getCoursesModel();

module.exports = async (req, res, next) => {
  
  // Finds the coach by id corresponding to the coach selected
  let id = req.body.id;
  let coachCertifications = req.body.certs;
  let certsArray = coachCertifications.split('/');
  var coachCertArray = [];
  for (var cert of certsArray) {
    let course = await Course.find({courseName: cert});
    coachCertArray.push(course)
  }
  let flatCoachArray = coachCertArray.reduce(
    ( accumulator, currentValue ) => accumulator.concat(currentValue),[]);

  await Coach.findById(id, (err, coach) => {
    // Error and undefined entries handlers
    if(err)
      console.log("Error Selecting : %s ", err); 
    if (!coach)
      return res.render('404');
    
    //  Changes the coach's properties with the new values
    coach.firstName = req.body.fname;
    coach.lastName = req.body.lname;
    coach.emailAddress = req.body.email;
    coach.certifications = flatCoachArray;
    
    // Saves to the database, and redirects to /coaches
    coach.save((err) => {
      if (err)
        console.log("Error updating : %s ",err );
      res.redirect('/admin/coaches');
    });

  });
    
};
