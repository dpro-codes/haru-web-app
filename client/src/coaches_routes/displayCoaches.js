const haruDB = require('../../../server/haruDB.js');
const Coach = haruDB.getCoachesModel();


// Display Coaches

module.exports = async (req, res ,next) => {

    let coaches = await Coach.find({});

    let results = coaches.map( emp => {
        let certificationNames =  emp.certifications.map(function(elem){return elem.courseName;}).join(' / ');
        return {
            id: emp._id,
            firstName: emp.firstName,
            lastName: emp.lastName,
            emailAddress: emp.emailAddress,
            certifications: certificationNames
        }
    });
        
    res.render('displayCoachesView',
            {title:"List of Coaches", data:results, layout: 'admin_platform_layout'});
        
};
