const haruDB = require('../../../server/haruDB.js');
const Coach = haruDB.getCoachesModel();

module.exports = async (req, res, next) => {

  // Fill in the code

  // Finds the employee by id using the URL parameter
  let id = req.params.id;
      
  await Coach.findById(id,  (err, coach) => {
    let certs = coach.certifications
    let certificationNames = certs.map(function(elem){return elem.courseName;}).join('/');
    // Error and undefined entries handlers
    if(err)
      console.log("Error Selecting : %s ", err); 
    if (!coach)
      return res.render('404');

     // Renders view for the user to confirm deletion of the selected coach
    res.render('deleteCoachView',
        {title:"Delete Coach?", 
          data: {id: coach._id,
                firstName: coach.firstName,
                lastName: coach.lastName,
                emailAddress: coach.emailAddress,
                certifications: certificationNames},
                layout: 'admin_platform_layout'
        }); 

  });    

};
